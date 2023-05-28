import './Signup.scss'
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { Google as GoogleLogo } from '@mui/icons-material';
import { useEffect, useState } from 'react'
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../services/Firebase/config';
import { authServer } from '../../services/axios/axios';
import { Link, useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { showLoading, hideLoading } from '../../config/Redux/loadingSlice'
import { loginSuccess, loginFailure } from '../../config/Redux/authSlice'
import { showAlert } from '../../config/Redux/alertSlice';
import { useDispatch, useSelector } from 'react-redux'
import { validateName, validateEmail, validatePassword, validateCPassword } from '../../auth/validations'

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

const Signup = () => {
    const EMAIL_ = "email"
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCpassword] = useState("")
    const [nameValid, setNameValid] = useState({ valid: false, error: "" });
    const [emailValid, setEmailValid] = useState({ valid: false, error: "" });
    const [passwordValid, setPasswordValid] = useState({ valid: false, error: "" });
    const [cPasswordValid, setcPasswordValid] = useState({ valid: false, error: "" });
    const [showPassword, setShowPassword] = useState(true);
    const [showcPassword, setShowcPassword] = useState(true);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleClickShowcPassword = () => setShowcPassword(!showcPassword);
    const handleMouseDowncPassword = () => setShowcPassword(!showcPassword);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isAuthenticated } = useSelector((state: any) => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            return navigate(-1)
        }
    }, [isAuthenticated])

    const handleValidation = () => {
        setNameValid(validateName(name))
        setEmailValid(validateEmail(email))
        setPasswordValid(validatePassword(password))
        setcPasswordValid(validateCPassword(password, cPassword))
    }

    const signupUser = async (type: string) => {
        try {
            if (type === EMAIL_) {
                handleValidation()
            }
            if (type === EMAIL_ && !nameValid.valid && !emailValid.valid && !passwordValid.valid && !cPasswordValid.valid) {
                return 
            }

            dispatch(showLoading())
            const response =
                type === EMAIL_
                    ? await createUserWithEmailAndPassword(auth, email, password)
                    : await signInWithPopup(auth, new GoogleAuthProvider())

            let user: any = auth.currentUser

            name &&
                (await updateProfile(user, {
                    displayName: name,
                }));

            const IdToken = await response.user.getIdToken()

            try {
                const response = await authServer.post("/signup", { IdToken })
                dispatch(hideLoading())
                dispatch(loginSuccess(response.data))
                navigate('/')

            } catch (err: any) {
                const errObj = {
                    message: err?.message ? err.message : 'Unable to signup'
                }

                throw errObj
            }
        } catch (err: any) {
            dispatch(hideLoading())
            dispatch(showAlert(err.message))
            dispatch(loginFailure(err.message))
        }
    }

    return (
        <>
            <div className="mt-28">
                <h1 className='text-black font-bold text-4xl'>Get Started</h1>
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
                    <div className='flex justify-center'>
                        <TextField
                            error={nameValid.valid !== true && nameValid.error != ''}
                            id={nameValid.valid ? "outlined-required" : "outlined-error"}
                            label="Name"
                            helperText={nameValid.error}
                            onChange={(e) => setName(e.target.value)}
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
                    <div>
                        <TextField
                            label="Email"
                            error={emailValid.valid !== true && emailValid.error != ''}
                            id={emailValid.valid ? "outlined-required" : "outlined-error"}
                            helperText={emailValid.error}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <div>
                        <TextField
                            error={passwordValid.valid !== true && passwordValid.error != ''}
                            id={passwordValid.valid ? "outlined-required" : "outlined-error"}
                            helperText={passwordValid.error}
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'password' : 'text'}
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
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '55ch' },
                    }}
                    noValidate
                    autoComplete="off">
                    <div>
                        <TextField
                            error={cPasswordValid.valid !== true && cPasswordValid.error != ''}
                            id={cPasswordValid.valid ? "outlined-required" : "outlined-error"}
                            helperText={cPasswordValid.error}
                            label="Confirm Password"
                            onChange={(e) => setCpassword(e.target.value)}
                            type={showcPassword ? 'password' : 'text'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowcPassword}
                                            onMouseDown={handleMouseDowncPassword}
                                        >
                                            {showcPassword ? <VisibilityOff /> : <Visibility />}
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
                    <Button color='primary' className='w-96 h-12' variant="contained" onClick={() => signupUser(EMAIL_)}>Create account</Button>
                    <Button className='w-96 h-12' variant="outlined" onClick={() => signupUser('')}><GoogleLogo className='mr-2' color='secondary'></GoogleLogo>Sign in with google</Button>
                </ThemeProvider>
                <Link to={'/login'}><span className="text-black text-sm mt-1">Already have an account?<span className="text-orange-300 text-sm"> Login</span></span></Link>
            </div>
        </>
    )
}

export default Signup
