import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import { logoutSuccess } from '../../../config/Redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Avatar, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { Close } from '@mui/icons-material';
import { makeApiCall } from '../../../services/axios/axios';
import axios from 'axios';

const Navbar = () => {
  const userData = useSelector((state: any) => state.auth)
  const [logoutDiv, setLogoutDiv] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const debounce = (fn: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn.apply(null, args);
      }, delay);
    };
  };
  
  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    const fetchSuggestions = async (value: string) => {
      try {
        if(value != ''){
          const res = await makeApiCall(`/doctor/search-doctor?query=${value}`, 'GET', '', cancelTokenSource);
          setSuggestions(res.data);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request cancelled');
        } else {
          console.log('Error:', err);
        }
      }
    };
  
    const debouncedFetchSuggestions = debounce(fetchSuggestions, 100);
    debouncedFetchSuggestions(inputValue)
    return () => {
      cancelTokenSource.cancel('Request cancelled');
    };
  }, [inputValue]);
  

  const showLogout = () => {
    setLogoutDiv(!logoutDiv)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(logoutSuccess())
    setLogoutDiv(false)
  }


  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));


  return (

    <React.Fragment>
      <div className='navbar w-screen p-4 flex justify-between items-center px-10'>
        <nav className="flex items-center">
          <a
            className="text-3xl font-bold leading-none flex items-center space-x-4"
            href="#"
          >
            <span className="text-black text-lg">
              Doc<span className="text-orange-500 text-lg">Hub</span>
            </span>
          </a>
          <Search sx={{ color: 'black' }} onClick={() => setShowSearch(true)}>
            <SearchIconWrapper sx={{ color: 'black' }}>
              <SearchIcon sx={{ color: 'black' }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{ color: 'black' }}
            />
          </Search>
        </nav>
        <div>
          <div className="flex items-center space-x-2" onClick={showLogout}>
            <span className="flex flex-col">
              <span className="text-sm font-medium hidden sm:block md:block text-gray-900">
                {userData.isAuthenticated ? userData?.user?.name?.toUpperCase() : 'Please Login'}
              </span>
            </span>
            {userData.isAuthenticated ?
              userData?.user?.profileURL == false ? <Avatar sx={{ backgroundColor: 'black' }}>{userData?.user?.name[0]}</Avatar> : <img className="inline-block w-10 h-10 rounded-full" src={userData?.user?.profileURL} /> :
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
      {showSearch && <div className="absolute top-0 left-0 w-screen h-full bg-gray-700 opacity-95 z-40 select-none">
        <Close onClick={() => setShowSearch(false)} sx={{ color: 'white' }} className='mt-2' />
        <div className="w-4/6 z-50 relative mx-auto mt-36 overflow-y-scroll overflow-x-hidden" >
          <div className="bg-white w-full h-16 rounded-xl mb-3 shadow-lg p-2">
            <input onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Search" value={inputValue} className="w-full h-full text-2xl rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          {suggestions.length && <div className="bg-white w-full h-full rounded-xl shadow-xl p-1">
            {suggestions.map((items: any) => (
              <div onClick={() => navigate(`/doctors/schedule/${items['_id']}`)} className="w-full flex p-3 pl-4 items-center hover:bg-gray-300 rounded-lg cursor-pointer">
                <div className="mr-4"><div className="h-9 w-9 rounded-sm flex items-center justify-center text-3xl" >
                  <Avatar src={items.photoURL}></Avatar>
                </div>
                </div>
                <div className='flex flex-col items-start'>
                  <div className="font-bold text-lg">Dr. {items.name}</div>
                  <div className="text-xs text-gray-500">
                    <span className="mr-2">{items.specialization} |</span>
                    <span className="mr-2">{items.about}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>}
        </div>
      </div>}
    </React.Fragment>
  )
}

export default Navbar
