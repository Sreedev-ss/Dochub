import * as React from 'react';
import './Navbar.scss'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { logoutSuccess } from '../../../config/Redux/authslice';
import { useDispatch, useSelector } from 'react-redux';
import { updateState } from '../../../config/Redux/stateSlice';
import { io, Socket } from 'socket.io-client';
import { updateCount } from '../../../config/Redux/notificationSlice';
import { makeApiCall } from '../../../services/axios/axios';
import { useState } from 'react';
import { Button } from '@mui/material';
import { format } from 'timeago.js'

const socket: Socket = io('http://localhost:8080');

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

interface Doctor {
    email: string,
    DoctorId: string,
    specialization: string,
    fees: number,
    mobile: number,
    address: string,
    photoURL: string,
    worktime: string,
    name: string;
    DOB: string;
    gender: string;
    about: string;
    approved:boolean,
    createdAt:string
}


const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false)
    const { count } = useSelector((state: any) => state.notification)
    const [doctorReq, setDoctorReq] = useState([])

    React.useEffect(() => {
        socket.on('count', (updatedCount: number) => {      
            dispatch(updateCount(updatedCount))
        });
        return () => {
            socket.disconnect();
        };

    }, []);


    React.useEffect(() => {
        const getDoctorReq = async () => {
            const doctorReq = async () => {
                return makeApiCall('/doctor/get-doctor-requests', 'GET');
            };
            const { data } = await doctorReq()
            setDoctorReq(data)
        }
        getDoctorReq()
    }, [count])

    const openNotification = () => {
        setOpen(!open)
    }

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logoutSuccess())
    }

    const handleSidebar = (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            dispatch(updateState(open))
        }

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 0 new mails" color="inherit">
                    <Badge badgeContent={0} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 0 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={count} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className='navbar' position="static" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, color: '#4b5563' }}
                        onClick={handleSidebar(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <span className="text-black text-lg">
                        Doc<span className="text-blue-500 text-lg">Hub - Admin</span>
                    </span>
                    <Search sx={{ color: 'black' }}>
                        <SearchIconWrapper sx={{ color: 'black' }}>
                            <SearchIcon sx={{ color: 'black' }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            sx={{ color: 'black' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1, color: 'black' }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, color: 'black' }}>
                        <IconButton size="large" aria-label="show 4 new mails" sx={{ color: '#4b5563' }}>
                            <Badge badgeContent={0} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            sx={{ color: '#4b5563' }}
                            onClick={openNotification}
                        >
                            <Badge badgeContent={count} color="error" >
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            sx={{ color: '#4b5563' }}
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            sx={{ color: '#4b5563' }}
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
                {open && <div className="popup-container" onClick={openNotification}>
                    <div className="mt-10">
                    {doctorReq.map((item: Doctor, index: number) => (
                        <div  key={index}>
                                    <div className="mt-4 bg-white  px-5 py-3.5 rounded-lg shadow hover:shadow-xl max-w-lg ml-auto mr-16 transform hover:-translate-y-[0.125rem] transition duration-100 ease-linear">
                                        <div className="w-full flex items-center justify-between">
                                            <span className="font-medium text-sm text-slate-400">New request</span>
                                        </div>
                                        <div className="flex items-center mt-2 rounded-lg px-1 py-1 cursor-pointer">
                                            <div className="relative flex flex-shrink-0 items-end">
                                                <img className="h-16 w-16 rounded-full" src={item.photoURL} />
                                                <span className="absolute h-4 w-4 bg-green-400 rounded-full bottom-0 right-0 border-2 border-white"></span>
                                            </div>
                                            <div className="ml-3 flex flex-col gap-1">
                                                <span className="font-semibold tracking-tight text-black text-xs">Name: {item.name}</span>
                                                <span className="text-xs leading-none text-black opacity-50">Email: {item.email}</span>
                                                <span className="text-xs leading-none text-black opacity-50">Department: {item.specialization}</span>
                                                <span className="text-[10px] text-blue-500 font-medium leading-4 opacity-75">{format(item.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                        </div>
                    ))}
                    </div>
                </div>}


            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}

export default Navbar