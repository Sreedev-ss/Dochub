import React, { useEffect, useRef, useState } from 'react'
import './ChatContent.scss'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { makeApiCall } from '../../../services/axios/axios';
import { Avatar } from '@mui/material';
import {format} from 'timeago.js'

const ChatContent = ({ open, chat, currentUser, setSendMessage, receivedMessage, currentDoctor }: any) => {
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState<any>([]);
    const [newMessage, setNewMessage] = useState<any>("");
    const scroll = useRef<any>();

    const handleChange = (e: any) => {
        setNewMessage(e.target.value)
    }

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const getMessages = async (id: any) => {
                    return makeApiCall(`/doctor/message/${id}`, 'GET')
                }
                const { data } = await getMessages(chat._id);
                setMessages(data);
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        };

        if (chat !== null) fetchMessages();
    }, [chat]);

    const handleSend = async (e: any) => {
        e.preventDefault()
        if(newMessage.trim() == "") return
        const message = {
            senderId: currentUser,
            text: newMessage.trim(),
            chatId: chat._id,
        }
        const recieverId = chat.members.find((id: any) => id !== currentUser);
        setSendMessage({ ...message, recieverId })
        try {
            const addMessage = async (credentials: { message: object }) => {
                return makeApiCall(`/doctor/message`, 'POST', credentials)
            }
            const { data } = await addMessage({ message });
            setMessages([...messages, data]);
            setNewMessage("");
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log("Message Arrived: ", receivedMessage)
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            setMessages([...messages, receivedMessage]);
        }

    }, [receivedMessage])

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])


    return (
        <div className="flex-1 p:3 sm:p-3 justify-between flex flex-col contentDiv bg-white rounded-lg">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                <div className="relative flex items-center space-x-4">
                    <div className="relative">
                        <div className="relative">
                            <Avatar className="w-6 sm:w-12 h-6 sm:h-12 rounded-full" src={currentDoctor?.doctorProfile} />
                            <div className="online-dot w-3 h-3 absolute right-0 bottom-0 bg-green-500 rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex flex-col leading-tight">
                        <div className="text-xl mt-1 flex items-center">
                            <span className="text-gray-700 mr-3">Dr {currentDoctor?.doctorName}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className='cursor-pointer' onClick={() => open(true)}><ArrowBackRoundedIcon /> Go back</span>
                    <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            {messages.length !== 0 ? messages?.map((message: any) => (
                        <div className="chat-message" ref={scroll}>
                            <div className={
                                message.senderId !== currentUser
                                    ? "message own flex items-end "
                                    : "message flex items-end justify-end"
                            }>
                                <div className={message.senderId !== currentUser ? "flex flex-col text-xs max-w-xs mx-2 order-2 items-start" : "flex flex-col  text-xs max-w-xs mx-2 order-1 items-end"}>
                                    <span className='flex gap-1'>
                                        <span className={message.senderId !== currentUser ? "px-4 py-2 rounded-lg text-start inline-block rounded-bl-none bg-gray-300 text-gray-600" : "px-4 py-2 rounded-lg inline-block rounded-br-none text-end bg-blue-600 text-white "}>{message.text}</span>
                                        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className={message.senderId === currentUser ? "w-6 h-6 rounded-full order-1 mt-2" : "w-6 h-6 rounded-full order-2 mt-2"} />
                                    </span>
                                    <span className='timeagoTxt text-gray-500 rounded-lg inline-block'>{format(message.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                    )) : <h1>No messages! Send your first message</h1>}


            </div>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                <div className="relative flex">
                    <span className="absolute inset-y-0 flex items-center">
                        <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                            </svg>
                        </button>
                    </span>
                    <input type="text" placeholder="Write your message!" id='inputTxt' value={newMessage} onChange={handleChange} className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3" />
                    <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                        <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                            </svg>
                        </button>
                        <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </button>
                        <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </button>
                        <button type="button" id='sendBtn' onClick={handleSend} className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                            <span className="font-bold" >Send</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ChatContent



