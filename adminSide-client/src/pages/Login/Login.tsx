import React, { SyntheticEvent, useEffect, useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '@mui/joy/Button';
import { validateEmail, validatePassword } from '../../auth/validations';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../config/Redux/loadingSlice';
import { makeApiCall } from '../../services/axios/axios';
import { loginSuccess } from '../../config/Redux/authslice';
import { showAlert } from '../../config/Redux/alertSlice';
import { useNavigate } from 'react-router-dom';
import { loginFailure } from '../../config/Redux/authslice';

interface validationObj {
    valid: boolean;
    error: string;
}
const Login: React.FC = () => {
    const { isAuthenticated } = useSelector((state: any) => state.auth)
    useEffect(() => {
        if (isAuthenticated) {
            return navigate('/admin')
        }
    }, [isAuthenticated])

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [emailValid, setEmailValid] = useState<validationObj>({ valid: false, error: "" });
    const [passwordValid, setPasswordValid] = useState<validationObj>({ valid: false, error: "" });
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleValidation = () => {
        setEmailValid(validateEmail(email))
        setPasswordValid(validatePassword(password))
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        handleValidation()

        if (!emailValid.valid && !passwordValid.valid) {
            return
        }

        dispatch(showLoading())
        const login = async (credentials: {email: string,password: string}) => {
            return makeApiCall('/auth/admin/login', 'POST', credentials);
        };

        login({email,password}).then((response)=>{
            dispatch(hideLoading())
            dispatch(showAlert('SUCCESS FULLY LOGGED IN'))
            dispatch(loginSuccess(response.data))
            navigate('/admin')
        }).catch((error:any)=>{
            dispatch(showAlert('LOG IN FAILED'))
            dispatch(loginFailure(error.message))
        })

    }
    return (
        <main>
            <Sheet
                sx={{
                    width: 400,
                    mx: 'auto',
                    my: 20,
                    py: 3,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    borderRadius: 'sm',
                    boxShadow: 'md',
                }}
                variant="outlined"
            >
                <div>
                    <Typography level="h4" component="h1">
                        <b>Welcome Admin!</b>
                    </Typography>
                    <Typography level="body2">Sign in to continue.</Typography>
                </div>
                
                <div>
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
                </div>

                <Button onClick={handleSubmit} sx={{ mt: 1 }}>Log in</Button>
            </Sheet>
        </main>
    );
}

export default Login