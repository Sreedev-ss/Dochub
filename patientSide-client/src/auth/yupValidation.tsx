import * as yup from 'yup';

const yupValidation = yup.object().shape({
    name: yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be at most 50 characters'),
    age: yup.number().typeError('Age must be a number')
    .integer('Age must be a number').positive('Age must be a positive number')
        .notOneOf([0], 'Age cannot be zero').required('Age is Required')
        .min(1, 'Age must be at least 1')
        .max(100, 'Age must be at most 100'),
    gender: yup.string().required('Select a gender'),
    symptoms: yup.string().required('Symptoms are required').min(5, 'Symptom must be at least 5 characters')
        .max(500, 'Symptom must be at most 100 characters'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    mobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be a 10-digit number').required('Mobile number is required'),
});

export default yupValidation;