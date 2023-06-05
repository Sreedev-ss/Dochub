import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.scss'
import { Avatar, Button, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updateState } from '../../../config/Redux/stateSlice'
import MenuIcon from '@mui/icons-material/Menu'
import { logoutSuccess } from '../../../config/Redux/authslice'

const Navbar = () => {
    const [logoutDiv, setLogoutDiv] = useState(false)
    const userData = useSelector((state: any) => state.auth)
    const showLogout = () => {
        setLogoutDiv(!logoutDiv)
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logoutSuccess())
        setLogoutDiv(false)
    }

    return (
        <React.Fragment>
            <div className='navbar p-4 flex justify-between items-center px-10'>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => dispatch(updateState(true))}
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
                <nav className="flex items-center">
                    <a
                        className="text-3xl font-bold leading-none flex items-center"
                        href="/doctor"
                    >
                        <span className="text-black text-lg">
                            Doc<span className="text-orange-500 text-lg">Hub</span>
                        </span>
                    </a>
                </nav>
                <div>
                   <div className="flex items-center space-x-2" onClick={showLogout}>
                   <span className="flex ">
                        <span className="text-sm font-medium text-gray-900">
                            {userData.isAuthenticated ? `Dr. ${userData.user?.data?.name.toUpperCase()}` : 'Please Login'}
                        </span>
                    </span>
                  
                        {userData.isAuthenticated ?
                            userData?.user?.data?.photoURL == "" ? <Avatar sx={{ backgroundColor: 'black' }}>{userData.user?.data?.name.slice(0, 1)}</Avatar> : <img className="inline-block w-10 h-10 rounded-full" src={userData?.user?.data?.photoURL } /> :
                            <img className="inline-block w-10 h-10 rounded-full" src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" />}
                   </div>
                    {logoutDiv && <div className='absolute p-1 border-2 top-16 bg-gray-100'>

                        {userData.isAuthenticated ? <span className="cursor-pointer text-sm font-medium text-gray-900"
                            onClick={handleLogout}
                        >
                            Logout
                        </span> :
                            <><span className="text-sm font-medium text-gray-900 cursor-pointer"
                                onClick={() => navigate('/doctor/login')}
                            >
                                Login
                            </span><br /><span className="text-sm font-medium text-gray-900 cursor-pointer"
                                onClick={() => navigate('/doctor/signup')}
                            >
                                    Signup
                                </span></>

                        }

                    </div>}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Navbar
