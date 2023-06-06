import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { Google as GoogleLogo } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom'
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/Firebase/config';
import { makeApiCall } from '../../services/axios/axios';
import { showLoading, hideLoading } from '../../config/Redux/loadingSlice'
import { loginSuccess, loginFailure, fetchUserDetails } from '../../config/Redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '../../config/Redux/alertSlice';
import InputAdornment from '@mui/material/InputAdornment';
import { VisibilityOff, Visibility } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton';
import { validateEmail, validatePassword } from '../../auth/validations'

const theme = createTheme({
    palette: {
        primary: {
            main: '#6981A6',
        },
        secondary: {
            main: "#00000",
        },
    },
});

const Login: React.FC = () => {
    const EMAIL_ = "email"
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailValid, setEmailValid] = useState({ valid: false, error: "" });
    const [passwordValid, setPasswordValid] = useState({ valid: false, error: "" });
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector((state: any) => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            return navigate('/')
        }
    }, [isAuthenticated])

    const handleValidation = () => {
        setEmailValid(validateEmail(email))
        setPasswordValid(validatePassword(password))
    }


    const loginUser = async (type: string) => {
        try {
            if (type === EMAIL_) {
                handleValidation()
            }

            if (type === EMAIL_ && !emailValid.valid && !passwordValid.valid) {
                return
            }

            dispatch(showLoading())

            const response =
                type === EMAIL_
                    ? await signInWithEmailAndPassword(auth, email, password)
                    : await signInWithPopup(auth, new GoogleAuthProvider())

            const IdToken = await response.user.getIdToken()

            try {
                const login = async (credentials: { IdToken: string }) => {
                    return makeApiCall('/auth/patient/login', 'POST', credentials);
                };
                login({ IdToken: IdToken }).then((response) => {
                    dispatch(hideLoading())
                    dispatch(loginSuccess(response.data.userId))
                    dispatch(fetchUserDetails(response.data.userId))
                    navigate('/')
                }).catch((error: any) => {
                    dispatch(hideLoading())
                    console.log(error);
                })
            } catch (err: any) {
                const errObj = {
                    message: err?.message
                }
                throw errObj
            }

        } catch (err: any) {
            dispatch(showAlert(err.message))
            dispatch(hideLoading())
            dispatch(loginFailure(err.message))
        }
    }

    return (
        <>
            <div className='login'>
                <h1 className='text-black font-bold text-4xl mt-28'>Hi</h1>
                <span className="text-gray-500 text-sm mt-3">Welcome to Doc<span className="text-orange-300 text-sm">hub!</span></span>

                <Box
                    className='mt-10'
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '55ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '55ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            error={emailValid.valid !== true && emailValid.error != ''}
                            id={emailValid.valid ? "outlined-required" : "outlined-error"}
                            helperText={emailValid.error}
                            label="Email"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        />
                    </div>
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '55ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div className='flex justify-center'>
                        <TextField
                            error={passwordValid.valid !== true && passwordValid.error != ''}
                            id={passwordValid.valid ? "outlined-required" : "outlined-error"}
                            helperText={passwordValid.error}
                            label="Password"
                            type={showPassword ? 'password' : 'text'}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                </Box>

            </div>
            <div className='mt-10 flex flex-col items-center gap-4'>
                <ThemeProvider theme={theme}>
                    <Button color='primary' className='w-96 h-12' variant="contained" onClick={() => loginUser(EMAIL_)}>Login</Button>
                    <Button className='w-96 h-12' variant="outlined" onClick={() => loginUser('')}><GoogleLogo className='mr-2' color='secondary'></GoogleLogo>Sign in with google</Button>
                </ThemeProvider>
                <Link to={'/signup'}><span className="text-black text-sm mt-1">Don't have an account?<span className="text-orange-300 text-sm"> Signup</span></span></Link>
            </div>
        </>
    )
}

export default Login;
