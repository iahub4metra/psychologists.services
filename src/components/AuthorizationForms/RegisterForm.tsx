import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from '@mui/material';
import { registerSchema } from '../../utils/validationSchema';
import s from './Forms.module.css';
import { useEffect, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface FormValues {
    name: string;
    email: string;
    password: string;
}

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);

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
        formState: { errors, isSubmitSuccessful },
    } = useForm<FormValues>({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = (data: FormValues) => {
        console.log('Submited data', data);
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ name: '', email: '', password: '' });
        }
    });

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
                    <p>{errors.email?.message}</p>
                </div>
                <div className="mb-[18px]">
                    <TextField
                        {...register('email')}
                        variant="outlined"
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
                    <p>{errors.email?.message}</p>
                </div>
                <div className="mb-[40px]">
                    <FormControl
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
                    </FormControl>
                    <p>{errors.password?.message}</p>
                </div>
                <button type="submit" className={s.btnSubmit}>
                    Sign Up
                </button>
            </form>
        </div>
    );
}
