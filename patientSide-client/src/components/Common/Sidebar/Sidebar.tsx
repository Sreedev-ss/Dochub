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
import { Link } from 'react-router-dom'

const Sidebar = () => {
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
    
    return (
        <React.Fragment>
            <aside className="sidebar hidden lg:block  w-64 h-screen overflow-y-auto bg-white ">
                <nav className="flex-1 mt-10 mx-10 " >
                    <ul className='space-y-4'>
                        {sidebarItems.map((items: any) => {
                            return <li key={items.name}>
                                <Link to={items.link} className=''>
                                    <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700" >
                                        {items.icon}
                                        <span className="mx-2 text-sm font-medium">{items.name}</span>
                                    </a>
                                </Link>
                            </li>
                        })}
                    </ul>
                </nav>
            </aside>
        </React.Fragment>
    )
}

export default Sidebar


