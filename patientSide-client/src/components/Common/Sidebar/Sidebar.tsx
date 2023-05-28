import React from 'react'
import './Sidebar.scss'
import {
    Home,
    Diversity1,
    Schedule,
    PersonalVideoOutlined,
    VideoChatOutlined,
    ChatOutlined,
    MedicalInformationOutlined,
    BookOnlineOutlined
} from '@mui/icons-material';
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <React.Fragment>
            <div className="sidebar  w-64 h-screen overflow-y-auto bg-white ">
                {/* <nav className="flex items-center ml-14 mt-7">
                   
                </nav> */}
                <nav className="flex-1 mt-10 mx-10 " >
                    <ul className='space-y-4'>
                        <li >
                            <Link to='/' className=''>
                                <a id='home' className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700" >
                                    <Home />
                                    <span className="mx-2 text-sm font-medium">Home</span>
                                </a>
                            </Link>
                        </li>

                        <li>
                            <Link to='/doctors'>
                                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 hover:text-gray-700">
                                    <Diversity1 />
                                    <span className="mx-2 text-sm font-medium">Doctors</span>
                                </a>
                            </Link>
                        </li>

                        <li>
                            <Link to='/schedule'>
                                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 hover:text-gray-700" >
                                    <Schedule />
                                    <span className="mx-2 text-sm font-medium">Schedule</span>
                                </a>
                            </Link>
                        </li>

                        <li>

                            <Link to='/Blog'>
                                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 hover:text-gray-700">
                                    <PersonalVideoOutlined />
                                    <span className="mx-2 text-sm font-medium">Blog</span>
                                </a>
                            </Link>
                        </li>

                        <li>

                            <Link to='/videochat'>
                                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 hover:text-gray-700">
                                    <VideoChatOutlined />
                                    <span className="mx-2 text-sm font-medium">Video chat</span>
                                </a>
                            </Link>
                        </li>

                        <li>

                            <Link to='/chat'>
                                <a
                                    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 hover:text-gray-700">
                                    <ChatOutlined />
                                    <span className="mx-2 text-sm font-medium">Chat</span>
                                </a>
                            </Link>
                        </li>

                        <li>

                            <Link to='/healthcare'>
                                <a
                                    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 hover:text-gray-700"
                                    href="#"
                                >
                                    <MedicalInformationOutlined />
                                    <span className="mx-2 text-sm font-medium">Health care</span>
                                </a>
                            </Link>
                        </li>

                        <li>
                            <Link to='/appointments'>
                                <a
                                    className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 hover:text-gray-700">
                                    <BookOnlineOutlined />
                                    <span className="mx-2 text-sm font-medium">Appointments</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </React.Fragment>
    )
}

export default Sidebar


