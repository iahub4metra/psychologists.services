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
import { registerSchema } from '../../utils/validationSchema';
import s from './Forms.module.css';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../utils/firebase-config';
import { setError, setUser } from '../../redux/auth/slice';
import { closeModal } from '../../redux/modal/slice';

interface FormValues {
    name: string;
    email: string;
    password: string;
}

export default function RegisterForm() {
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
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (data: FormValues) => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password,
            );
            await updateProfile(userCredentials.user, {
                displayName: data.name,
            });
            const user = userCredentials.user;

            dispatch(
                setUser({
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid,
                }),
            );
        } catch {
            dispatch(setError(true));
        } finally {
            reset();
            dispatch(closeModal());
        }
    };

    return (
        <div>
            <h3 className={s.title}>Registration</h3>
            <p className="text-[#191A1580]">
                Thank you for your interest in our platform! In order to
                register, we need some information. Please provide us with the
                following information.
            </p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="false"
                className="mt-[40px]"
            >
                <div className="mb-[18px]">
                    <TextField
                        {...register('name')}
                        variant="outlined"
                        label="Name"
                        error={Boolean(errors.name?.message)}
                        helperText={errors.name?.message}
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
                <div className="mb-[18px]">
                    <TextField
                        {...register('email')}
                        variant="outlined"
                        label="Email"
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
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
                        error={Boolean(errors.password?.message)}
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
                    Sign Up
                </button>
            </form>
        </div>
    );
}
