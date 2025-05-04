import * as yup from 'yup';

const phoneRegExp = /^\+?[0-9\s\-()]{7,}$/;

export const loginSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
        .string()
        .min(6, 'Minimum 6 characters')
        .required('Password is required'),
});

export const registerSchema = yup.object({
    name: yup.string().min(3).required(),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
        .string()
        .min(6, 'Minimum 6 characters')
        .required('Password is required'),
});

export const appointmentSchema = yup.object({
    name: yup.string().min(3).required(),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup
        .string()
        .matches(phoneRegExp, 'Enter a valid phone number')
        .required(),
    time: yup.date().required(),
    comment: yup.string().required(),
});
