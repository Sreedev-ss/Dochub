import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import { logoutSuccess } from '../../../config/Redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';


const Navbar = () => {
  const userData = useSelector((state: any) => state.auth)
  const [logoutDiv, setLogoutDiv] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const showLogout = () => {
    setLogoutDiv(!logoutDiv)
  }

  const handleLogout = () => {
    dispatch(logoutSuccess())
    setLogoutDiv(false)
  }

  return (

    <React.Fragment>
      <div className='navbar p-4 flex justify-between items-center px-10'>
        <nav className="flex items-center">
          <a
            className="text-3xl font-bold leading-none flex items-center space-x-4"
            href="#"
          >
            <span className="text-black text-lg">
              Doc<span className="text-orange-500 text-lg">Hub</span>
            </span>
          </a>
        </nav>
        <div>
          <div className="flex items-center space-x-2" onClick={showLogout}>
            <span className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {userData.isAuthenticated ? userData.user?.name.toUpperCase() : 'Please Login'}
              </span>
            </span>
            {userData.isAuthenticated ?
              userData.user.profileURL == false ? <Avatar sx={{backgroundColor:'black'}}>{userData.user?.name.slice(0, 1)}</Avatar> : <img className="inline-block w-10 h-10 rounded-full" src={userData.user.profileURL} /> :
              <img className="inline-block w-10 h-10 rounded-full" src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" />}
          </div>
          {logoutDiv && <div className='absolute p-1 border-2 top-16 bg-gray-100'>
            {userData.isAuthenticated ? <span className="cursor-pointer text-sm font-medium text-gray-900"
              onClick={handleLogout}
            >
              Logout
            </span> :
              <><span className="text-sm font-medium text-gray-900 cursor-pointer"
                onClick={() => navigate('/login')}
              >
                Login
              </span><br /><span className="text-sm font-medium text-gray-900 cursor-pointer"
                onClick={() => navigate('/signup')}
              >
                  Signup
                </span></>

            }
            <br />
            {userData.isAuthenticated && <span className="text-sm cursor-pointer font-medium text-gray-900">
              Profile
            </span>}
          </div>}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Navbar
