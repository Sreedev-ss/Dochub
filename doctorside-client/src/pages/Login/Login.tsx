import React, { useState, SyntheticEvent, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Container, Typography, TextField, Button, Paper, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Login.scss'
import { validateEmail, validatePassword } from '../../auth/validations';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  makeApiCall } from '../../services/axios';
import { loginFailure, loginSuccess } from '../../config/Redux/authslice';
import { hideLoading, showLoading } from '../../config/Redux/loadingSlice';
import { showAlert } from '../../config/Redux/alertSlice';

const theme = createTheme();

const LoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailValid, setEmailValid] = useState({ valid: false, error: "" });
    const [passwordValid, setPasswordValid] = useState({ valid: false, error: "" });
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector((state: any) => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            return navigate(-1)
        }
    }, [isAuthenticated])


    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleValidation = () => {
        setEmailValid(validateEmail(email))
        setPasswordValid(validatePassword(password))
    }

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        handleValidation()

        if (!emailValid.valid || !passwordValid.valid) {
            return
        }

        dispatch(showLoading())

        const login = async (credentials: {email: string,password: string}) => {
            return makeApiCall('/auth/doctor/login', 'POST', credentials);
        };

        login({ email, password }).then(async (response) => {
            console.log(response,'res1111');
            
            if (response.status) {
                try {
                    const getDoctor = async () => {
                        return makeApiCall(`/doctor/get-doctor/${response.data.email}`, 'GET');
                    };
                    const { data } = await getDoctor()
                    console.log(data);
                    
                    const fullData = { data: data, id: response.data.userId, token: response.data.token }
                    dispatch(hideLoading())
                    dispatch(showAlert('SUCCESS FULLY LOGGED IN'))
                    dispatch(loginSuccess(fullData))
                    navigate('/doctor')
                } catch (error: any) {
                    const errObj = {
                        message: error?.message
                    }
                    throw errObj
                }
            }

        }).catch((err: any) => {
            dispatch(showAlert(err.message))
            dispatch(hideLoading())
            dispatch(loginFailure(err.message))
        })
    };
    return (
        <ThemeProvider theme={theme}>
            <Grid container style={{ height: '100vh' }}>
                <Grid item xs={12} sm={12}>
                    <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Typography variant="h4" style={{ marginBottom: theme.spacing(4) }}>
                            Doctor Login
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                error={emailValid.valid !== true && emailValid.error != ''}
                                id={emailValid.valid ? "outlined-required" : "outlined-error"}
                                helperText={emailValid.error}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Email"
                                name="email"
                                autoFocus
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />
                            <TextField
                                error={passwordValid.valid !== true && passwordValid.error != ''}
                                id={passwordValid.valid ? "outlined-required" : "outlined-error"}
                                helperText={passwordValid.error}
                                label="Password"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                className='btnSubmit rounded-3xl w-32'
                                type="submit"
                                variant="contained"
                                style={{ margin: theme.spacing(3, 0) }}
                            >
                                Sign In
                            </Button>
                        </form>

                    </Container>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <img
                        src="/doctor_illustration.avif"
                        alt="Doctor Illustration"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </Grid> */}
            </Grid>
        </ThemeProvider>
    );
};

export default LoginPage;
