import React, { Suspense, useEffect, useRef, useState } from 'react'
import ErrorBoundary from '../../util/ErrorBoundary'
import Navbar from '../../components/Common/Navbar/Navbar'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
const ChatContent = React.lazy(() => import('../../components/ChatComponent/Chat-Content/ChatContent'))
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Loading from '../../components/Common/Loading/loading'
import { hideLoading, showLoading } from '../../config/Redux/loadingSlice'
import { IAppointment } from '../../util/interfaces'
import { makeApiCall } from '../../services/axios/axios'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { Avatar } from '@mui/material'

const Chat = () => {
    const [open, setOpen] = useState<boolean>(true)
    const handleOpen = (value: boolean) => {
        setOpen(value)
    }
    const { user } = useSelector((state: any) => state.auth)

    const socket = useRef<any>();
    const dispatch = useDispatch()
    const [currentDoctor,setCurrentDoctor] = useState<any>(null)
    const [appointments, setAppointments] = useState<IAppointment[]>([])
    const [chat, setChat] = useState<any>([])
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);

    useEffect(() => {
        async function getAllAppointment() {
            try {
                const getAppointment = async () => {
                    return makeApiCall(`/doctor/all-appointment?id=${encodeURIComponent(user._id)}&role=${encodeURIComponent('patient')}`, 'GET');
                };
                const { data }: any = await getAppointment()
                const uniqueArray = await data.reduce((acc: any, curr: any) => {
                    const isDuplicate = acc.some((item: IAppointment) => item.doctorId == curr.doctorId)
                    if (!isDuplicate) {
                        acc.push(curr)
                    }
                    return acc
                }, [])
                setAppointments(uniqueArray)
                dispatch(hideLoading())
            } catch (error) {
                dispatch(hideLoading())
            }
        }
        dispatch(showLoading())
        getAllAppointment()
    }, [])

    useEffect(() => {
        const fetchChat = async () => {
            const getChats = async () => {
                return makeApiCall(`/doctor/chat/${user._id}`, 'GET')
            }
            const { data } = await getChats()
            setChat(data)
        }
        fetchChat()
    }, [])

    useEffect(() => {
        socket.current = io("wss://sreedev.live/socket");
        socket.current.emit("new-user-add", user._id);
        socket.current.on("get-users", (users: any) => {
            setOnlineUsers(users);
        });
    }, [user]);

    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);

    useEffect(() => {
        socket.current.on("recieve-message", (data: any) => {
            console.log(data)
            setReceivedMessage(data);
        }
        );
    }, []);

    const checkOnlineStatus = (chat: any) => {
        const chatMember = chat.members.find((member: any) => member !== user._id);
        const online = onlineUsers.find((user: any) => user.userId === chatMember);
        return online ? true : false;
    };

    const handleClick = async (doctor: any) => {
        setOpen(false)
        const createChat = async (credentials: { senderId: string, recieverId: string }) => {
            return makeApiCall(`/doctor/chat`, 'POST', credentials)
        }

        await createChat({ senderId: user._id, recieverId: doctor.doctorId })
        const selectedChat = await chat.filter((data: any) => data.members[1] === doctor.doctorId)
        setCurrentChat(selectedChat[0])
        console.log(doctor)
        setCurrentDoctor(doctor)

    }

    return (
        <div className="flex flex-col overflow-hidden">
            <ErrorBoundary>
                <Navbar />
            </ErrorBoundary>
            <div className="mt-2 lg:flex lg:flex-grow">
                <ErrorBoundary>
                    <Sidebar />
                </ErrorBoundary>
                <div className="xs:flex md:flex-grow mx-2">
                    <ErrorBoundary>
                        {open ? <Suspense fallback={<Loading />}>
                            <div className="bg-white p-8 rounded-md w-full">
                                <h1 className='font-medium text-2xl mb-2 flex justify-start mx-3 tracking-widest'>Chat with your doctors</h1>
                                <div className='w-fit'>
                                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                            <table className="min-w-full leading-normal">
                                                <thead>
                                                    <tr>
                                                        <th
                                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                            Doctor
                                                        </th>
                                                        <th
                                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                            Send Message
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {appointments?.map((item) => (
                                                        <tr key={item.doctorId}>
                                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0 w-10 h-10">
                                                                        <Avatar className="w-full h-full rounded-full"
                                                                            src={item.doctorProfile}
                                                                            alt="" />
                                                                    </div>
                                                                    <div className="ml-3">
                                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                                            Dr. {item.doctorName}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-5 py-5 border-b cursor-pointer border-gray-200 bg-white text-sm" onClick={() => handleClick(item)}>
                                                                <SendRoundedIcon className='text-orange-500' />
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Suspense> :
                            <Suspense fallback={<Loading />}>
                                <ChatContent
                                    chat={currentChat}
                                    open={handleOpen}
                                    currentUser={user._id}
                                    setSendMessage={setSendMessage}
                                    receivedMessage={receivedMessage}
                                    currentDoctor={currentDoctor}
                                />
                            </Suspense>}
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    )
}

export default Chat
