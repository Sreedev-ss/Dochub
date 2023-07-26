import React, { useEffect, useState } from 'react'
import { makeApiCall } from '../../services/axios/axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { Avatar } from '@mui/material';

const Blogs = () => {
    const [blog, setBlog] = useState<any>([])

    interface Blog {
        title: string,
        imageUrl: string,
        doctorId: string,
        doctorName: string,
        doctorUrl: string,
        content: string,
        createdAt: string
    }

    useEffect(() => {
        const getBlogs = async () => {
            return makeApiCall(`/doctor/all-blogs`, 'GET')
        }

        getBlogs().then(async (response) => {
            if (response.status == 200) {
                setBlog(response.data)
            } else {
                toast.error('Something wrong')
            }
        })

    }, [])
    const avatarStyle = {
        width: 30,
        height: 30,
    };

    return (
        <div className=''>
            <Toaster />
            <section className="bg-white rounded mt-3 min-h-[730px]">
                <div className="container px-6 py-10 mx-auto">
                    <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl underline">Blogs</h1>
                    <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
                        {blog.map((item: Blog) => (
                            <div className="lg:flex shadow-xl rounded-sm p-1">
                                <div className='flex flex-col gap-2 justify-around'>
                                    <img className="object-cover w-full h-56 rounded-lg lg:w-64" src={item.imageUrl ? item.imageUrl : ''} alt="" />
                                    <div className="flex items-center gap-4 ml-2">
                                        <Avatar src={item.doctorUrl} sx={avatarStyle}></Avatar>
                                        <span className="text-sm text-gray-500">Dr. {item.doctorName}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between py-6 md:max-w-xs lg:mx-6">
                                    <a href="#" className="text-xl font-semibold text-gray-800 hover:underline ">
                                        {item.title}
                                    </a>
                                    <p className="whitespace-pre-wrap break-words my-4 text-gray-600">{item.content.slice(0, 100)} ...</p>


                                    <span className="text-sm text-gray-500">On: {new Date(item.createdAt).toLocaleDateString()}</span>
                                </div>

                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Blogs
