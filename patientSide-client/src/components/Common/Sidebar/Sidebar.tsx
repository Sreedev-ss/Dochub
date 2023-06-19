import React from 'react'
import './Sidebar.scss'
import {
    Home,
    Diversity1,
    PersonalVideoOutlined,
    VideoChatOutlined,
    ChatOutlined,
    MedicalInformationOutlined,
    BookOnlineOutlined
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom'



const Sidebar = () => {

    const location = useLocation()

    interface Ikeys {
        name: string,
        link: string,
        icon: React.SVGProps<SVGSVGElement>
    }

    const sidebarItems: Ikeys[] = [{
        name: 'Dashboard',
        link: '/',
        icon: <Home />
    },
    {
        name: 'Doctors',
        link: '/doctors',
        icon: <Diversity1 />
    },
    {
        name: 'Blog',
        link: '/Blog',
        icon: <PersonalVideoOutlined />
    },
    {
        name: 'Video chat',
        link: '/videochat',
        icon: <VideoChatOutlined />
    },
    {
        name: 'Chat',
        link: '/chat',
        icon: <ChatOutlined />
    },
    {
        name: 'Health care',
        link: '/healthcare',
        icon: <MedicalInformationOutlined />
    },
    {
        name: 'Appointments',
        link: '/appointments',
        icon: <BookOnlineOutlined />
    }]
    const isRouteActive = (path:any) => {
        const currentPathname = location.pathname.slice(1);
        return currentPathname === path.slice(1) || currentPathname.startsWith(`${path.slice(1)}/`);
      };
    return (
        <React.Fragment>
            <div className='flex justify-center '>
                <aside className="sidebar hidden lg:block  w-64 overflow-y-auto bg-white ">
                    <nav className="flex-1 mt-10 mx-10 " >
                        <ul className='space-y-4'>
                            {sidebarItems.map((items: any) => (
                                <li key={items.name} className={isRouteActive(items.link) ? 'active' : ''}>
                                    <Link to={items.link} className=''>
                                        <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700" >
                                            {items.icon}
                                            <span className="mx-2 text-sm font-medium">{items.name}</span>
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                <div className="sm:block mSidebar lg:hidden max-w-md px-5 fixed bottom-8 bg-white shadow-lg rounded-2xl">
                    <div className="flex ">
                        {sidebarItems.map((items: any) => (
                            <div className="flex-1 group">
                                <Link to={items.link} >
                                    <a href="#" className={isRouteActive(items.link) ? 'active flex items-end justify-center text-center mx-auto px-1 pt-2 w-full text-gray-600' : 'flex items-end justify-center text-center mx-auto px-1 pt-2 w-full text-gray-600'} >
                                        <span className="block px-1 pt-1 pb-1">
                                            {items.icon}
                                            <span className={isRouteActive(items.link) ? "block w-5 mx-auto h-1 bg-gray-600 rounded-full" : "block w-5 mx-auto h-1 rounded-full"}></span>
                                        </span>
                                    </a>
                                </Link>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Sidebar


