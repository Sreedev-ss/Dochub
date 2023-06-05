import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { BookOnlineOutlined, LocalHospital, ChatOutlined, Home, MedicalInformationOutlined, PersonalVideoOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { updateIndex, updateState } from '../../../config/Redux/stateSlice';


const Sidebar = () => {
    const { currentState, currentIndex } = useSelector((state: any) => state.state)
    const dispatch = useDispatch()
    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                dispatch(updateState(open))

            };

    const handleClick = (index: any) => {
        dispatch(updateIndex(index))
    };

    interface Ikeys {
        name: string,
        link: string,
        icon: React.SVGProps<SVGSVGElement>
    }

    const sidebarItems: Ikeys[] = [{
        name: 'Dashboard',
        link: '/admin',
        icon: <Home />
    },
    {
        name: 'Doctors',
        link: '/admin/doctors',
        icon:  <LocalHospital />
    },
    {
        name: 'Patients',
        link: '/admin/patients',
        icon:<BookOnlineOutlined />
    },
    {
        name: 'Blog',
        link: '/admin/blog',
        icon: <PersonalVideoOutlined />
    },
   ]

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}   
        >
            <List sx={{ marginTop: 4, padding: 1 }}>
                <nav className="ml-10 mb-12">
                    <a
                        className="text-3xl font-bold "
                        href="/doctor"
                    >
                        <span className="text-black text-lg">
                            Admin<span className="text-slate-500 text-lg"> Panel</span>
                        </span>
                    </a>
                </nav>
                {sidebarItems.map((items: any, index: number) => (
                    <List key={index} sx={{ marginTop: 0, paddingTop: 5 }}>
                        <Link to={items.link}>
                            <ListItem disablePadding onClick={() => handleClick(index)} >
                                <ListItemButton sx={{ backgroundColor: currentIndex === index ? 'ButtonShadow' : '' }} >
                                    <ListItemIcon>
                                        {items.icon}
                                    </ListItemIcon>
                                    <ListItemText  >{items.name}</ListItemText >
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Divider />
                    </List>

                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment >
                <Drawer
                    anchor='left'
                    open={currentState}
                    onClose={toggleDrawer(false)}
                >
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

export default Sidebar;
