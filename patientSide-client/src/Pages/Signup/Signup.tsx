import './Signup.scss'
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { Google as GoogleLogo } from '@mui/icons-material';
import { useEffect, useState } from 'react'
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../services/Firebase/config';
import { makeApiCall } from '../../services/axios/axios';
import { Link, useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { showLoading, hideLoading } from '../../config/Redux/loadingSlice'
import { loginSuccess, loginFailure, fetchUserDetails } from '../../config/Redux/authSlice'
import { hideAlert, showAlert } from '../../config/Redux/alertSlice';
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
    const [code, setCode] = useState('')
    const [showSignup, setShowsignup] = useState(true)
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleClickShowcPassword = () => setShowcPassword(!showcPassword);
    const handleMouseDowncPassword = () => setShowcPassword(!showcPassword);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let IdToken = ''
    dispatch(hideAlert())

    const { isAuthenticated } = useSelector((state: any) => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            return navigate('/')
        }
    }, [isAuthenticated])

    const handleValidation = () => {
        setNameValid(validateName(name))
        setEmailValid(validateEmail(email))
        setPasswordValid(validatePassword(password))
        setcPasswordValid(validateCPassword(password, cPassword))
    }

    const verifyEmail = async (credentials: { code: any, email: any }) => {
        return makeApiCall('/auth/patient/verify-email', 'POST', credentials);
    };

    const handleVerification = async () => {
        try {
            const response = await verifyEmail({ code, email })
            if (response.status == 200) {
                dispatch(hideLoading())
                dispatch(loginSuccess(response.data._id))
                dispatch(fetchUserDetails(response.data._id))
                navigate('/')
            }
        } catch (error:any) {
            dispatch(showAlert(error.message))
            
        }
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

            if (type !== EMAIL_) {
                const response = await signInWithPopup(auth, new GoogleAuthProvider())
                let user: any = auth.currentUser
                name &&
                    (await updateProfile(user, {
                        displayName: name,
                    }));
                IdToken = await response.user.getIdToken()
            }

            try {
                const signup = async (credentials: { IdToken: string, name: string, email: string, password: string, role: string }) => {
                    return makeApiCall('/auth/patient/signup', 'POST', credentials);
                };
                signup({ IdToken, name: name, email: email, password: password, role: 'patient' }).then(async (response) => {
                    if (!IdToken) {
                        dispatch(hideLoading())
                        const sendEmail = async (credentials: { email: string }) => {
                            return makeApiCall('/auth/patient/send-email-code', 'POST', credentials);
                        };
                        const response = await sendEmail({ email: email })
                        if (response.status == 200) {
                            setShowsignup(false)
                        }
                    } else {
                        dispatch(hideLoading())
                        dispatch(loginSuccess(response.data._id))
                        dispatch(fetchUserDetails(response.data._id))
                        navigate('/')
                    }
                }).catch((error: any) => {
                    throw error
                })

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
            {showSignup && <><div className="mt-28">
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
                            onChange={(e) => setName(e.target.value)} />
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
                            onChange={(e) => setEmail(e.target.value)} />
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
                            }} />
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
                            }} />
                    </div>
                </Box>
            </div><div className='mt-10 flex flex-col items-center gap-4'>
                    <ThemeProvider theme={theme}>
                        <Button color='primary' className='w-96 h-12' variant="contained" onClick={() => signupUser(EMAIL_)}>Create account</Button>
                        <Button className='w-96 h-12' variant="outlined" onClick={() => signupUser('')}><GoogleLogo className='mr-2' color='secondary'></GoogleLogo>Sign up with google</Button>
                    </ThemeProvider>
                    <Link to={'/login'}><span className="text-black text-sm mt-1">Already have an account?<span className="text-orange-300 text-sm"> Login</span></span></Link>
                </div></>
            }
            {
                  !showSignup &&
                    <div className="absolute flex w-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
                        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                            <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                                <div className="flex flex-col items-center justify-center text-center space-y-2">
                                    <div className="font-semibold text-3xl">
                                        <p>Email Verification</p>
                                    </div>
                                    <div className="flex flex-row text-sm font-medium text-gray-400">
                                        <p>We have sent a code to your email {email}</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex flex-col space-y-16">
                                        <div className="flex flex-row items-center justify-between gap-2 mx-auto w-full max-w-xs">
                                            <div className="w-80 h-16">
                                                <input onChange={(e) => setCode(e.target.value)} className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col space-y-5">
                                            <div>
                                                <button onClick={() => handleVerification()} className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                                                    Verify Account
                                                </button>
                                            </div>

                                            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                                <p>Didn't recieve code?</p> <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
            }
        </>
    )
}

export default Signup
