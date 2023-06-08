import * as yup from 'yup'

export const doctorSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    address: yup.string().required('Address is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    mobile: yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number').required('Mobile number is required'),
    specialization: yup.string().required('Department is required'),
    sex: yup.string().required('Gender is required'),
    DOB: yup.string().required('DOB is required'),
    fees: yup.string().required('Fees is required'),
    worktime: yup.string().required('Select an option'),
    about: yup.string().required('Address is required'),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'Password should contain atleast one letter, special character and one number ')
        .required('Password is required'),
    cpassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});