import React, { useState, SyntheticEvent } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Container, Typography, TextField, Button, Paper, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Login.scss'
import { validateEmail, validatePassword } from '../../auth/validations';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authServer } from '../../services/axios';

const theme = createTheme();

const LoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailValid, setEmailValid] = useState({ valid: false, error: "" });
    const [passwordValid, setPasswordValid] = useState({ valid: false, error: "" });
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleValidation = () => {
        setEmailValid(validateEmail(email))
        setPasswordValid(validatePassword(password))
    }

    const handleSubmit = async(event: SyntheticEvent) => {
        event.preventDefault();

        handleValidation()

        if (!emailValid.valid && !passwordValid.valid) {
            return
        }

        authServer.post('/login',{email,password}).then((response)=>{
        }).catch((error)=>{
            if(error.response){
                console.log(error.response.data);
            }else if (error.request){
                console.log(error.request);
            }else{
                console.log(error,'error in else');
                
            }
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
