import React, { Suspense, useEffect, useRef, useState } from 'react'
import ErrorBoundary from '../../util/ErrorBoundary'
import Navbar from '../../components/Common/Navbar/Navbar'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
const ChatContent = React.lazy(() => import('../../components/Chat/Chat'))
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Loading from '../../components/Common/Loading/loading'
import { hideLoading, showLoading } from '../../config/Redux/loadingSlice'
import { makeApiCall } from '../../services/axios'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { Avatar } from '@mui/material'

const Chat = () => {
    const { user } = useSelector((state: any) => state.auth)

    const socket = useRef<any>();
    const dispatch = useDispatch()

    const [appointments, setAppointments] = useState<any[]>([])
    const [chat, setChat] = useState<any>([])
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [currentChatName, setCurrentChatName] = useState("");
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);

    useEffect(() => {        
        async function getAllAppointment() {
            try {
                const getAppointment = async () => {
                    return makeApiCall(`/doctor/all-appointment?id=${encodeURIComponent(user.DoctorId)}&role=${encodeURIComponent('doctor')}`, 'GET');
                };
                const { data }: any = await getAppointment()
                const uniqueArray = await data.reduce((acc: any, curr: any) => {
                    const isDuplicate = acc.some((item: any) => item.doctorId == curr.doctorId)
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
                return makeApiCall(`/doctor/chat/${user.DoctorId}`, 'GET')
            }
            const { data } = await getChats()
            setChat(data)
        }
        fetchChat()
    }, [])

    useEffect(() => {
        socket.current = io("ws://localhost:8080");
        socket.current.emit("new-user-add", user.DoctorId);
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
            console.log(data,'recieved')
            setReceivedMessage(data);
        }
        );
    }, []);

    const checkOnlineStatus = (chat: any) => {
        const chatMember = chat.members.find((member: any) => member !== user._id);
        const online = onlineUsers.find((user: any) => user.userId === chatMember);
        return online ? true : false;
    };

    const handleClick = async (patientId: string,name:string) => {
        const createChat = async (credentials: { senderId: string, recieverId: string }) => {
            return makeApiCall(`/doctor/chat`, 'POST', credentials)
        }
        await createChat({ senderId: user.DoctorId, recieverId: patientId })
        const selectedChat = await chat.filter((data: any) => data.members[0] === patientId)
        setCurrentChat(selectedChat[0])
        setCurrentChatName(name)
    }

    return (
        <>
            <div className="flex flex-col overflow-hidden ">
                <ErrorBoundary>
                    <Navbar />
                </ErrorBoundary>
                <ErrorBoundary>
                    <Sidebar />
                </ErrorBoundary>
                <div className="mt-2 lg:flex lg:flex-grow gap-2 ">
                    <ErrorBoundary>
                        <Suspense fallback={<Loading />}>
                            <div className="flex flex-col p-3  w-64 bg-white ">
                                <div className="flex flex-row items-center justify-between text-xs">
                                    <span className="font-bold">Your patients</span>
                                </div>
                                <div className="flex flex-col space-y-1 mt-4 -mx-2 h-full overflow-y-auto">
                                    {appointments.map((items)=>(

                                    <button onClick={()=>handleClick(items.patientId,items.name)}
                                        className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                                    >
                                        <div
                                            className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                                        >
                                            {items.name.slice(0,1)}
                                        </div>
                                        <div className="ml-2 text-sm font-semibold">{items.name}</div>
                                    </button>
                                      
                                      ))}
                                </div>
                            </div>
                        </Suspense>
                        <Suspense fallback={<Loading />}>
                            <ChatContent
                                data={chat}
                                chat={currentChat}
                                currentUser={user._id}
                                currentUserName={currentChatName}
                                setSendMessage={setSendMessage}
                                receivedMessage={receivedMessage}
                            />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>

        </>
    )
}

export default Chat



