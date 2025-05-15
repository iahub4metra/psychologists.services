import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from '@mui/material';
import { loginSchema } from '../../utils/validationSchema';
import s from './Forms.module.css';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase-config';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { setError, setUser } from '../../redux/auth/slice';
import { closeModal } from '../../redux/modal/slice';
import { fetchFavourites } from '../../redux/favourites/operations';

interface FormValues {
    email: string;
    password: string;
}

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: FormValues) => {
        try {
            const credentials = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password,
            );
            const user = credentials.user;

            dispatch(
                setUser({
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid,
                }),
            );
            dispatch(fetchFavourites({ uid: user.uid }));
        } catch {
            dispatch(setError(true));
        } finally {
            reset();
            dispatch(closeModal());
        }
    };

    return (
        <div>
            <h3 className={s.title}>Log In</h3>
            <p className="text-[#191A1580]">
                Welcome back! Please enter your credentials to access your
                account and continue your search for a psychologist.
            </p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="false"
                className="mt-[40px]"
            >
                <div className="mb-[18px]">
                    <TextField
                        {...register('email')}
                        variant="outlined"
                        type="email"
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                        label="Email"
                        sx={{
                            maxWidth: '438px',
                            width: '100%',
                            '& .MuiInputBase-root': {
                                borderRadius: '12px',
                                borderColor: '#191A151A',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                transition:
                                    'all 250ms cubic-bezier(0.4, 0.2, 0, 0.1)',
                            },
                        }}
                    />
                </div>
                <div className="mb-[40px]">
                    <FormControl
                        error={Boolean(errors.email?.message)}
                        sx={{
                            maxWidth: '438px',
                            width: '100%',
                            '& .MuiInputBase-root': {
                                borderRadius: '12px',
                                borderColor: '#191A151A',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                transition:
                                    'all 250ms cubic-bezier(0.4, 0.2, 0, 0.1)',
                            },
                        }}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword
                                                ? 'hide the password'
                                                : 'display the password'
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        {errors.password?.message && (
                            <FormHelperText>
                                {errors.password.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                </div>
                <button type="submit" className={s.btnSubmit}>
                    Log in
                </button>
            </form>
        </div>
    );
}
