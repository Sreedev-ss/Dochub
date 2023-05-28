import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.scss'
import { Button, IconButton } from '@mui/material'
import { useDispatch } from 'react-redux'
import { updateState } from '../../../config/Redux/stateSlice'
import MenuIcon from '@mui/icons-material/Menu'

const Navbar = () => {
    const [logoutDiv, setLogoutDiv] = useState(false)
    const showLogout = () => {
        setLogoutDiv(!logoutDiv)
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
                    <span className="flex flex-col items-center ">
                        <img
                            className="inline-block w-10 h-10 rounded-full"
                            src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                            alt="profile"
                            onClick={showLogout}
                        />
                        <span className="text-sm font-medium text-gray-900">
                            Please Login
                        </span>
                    </span>
                    {logoutDiv && <div className='absolute p-1 border-2 top-16 bg-gray-100'>

                        <span className="text-sm font-medium text-gray-900 cursor-pointer"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </span>

                    </div>}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Navbar
