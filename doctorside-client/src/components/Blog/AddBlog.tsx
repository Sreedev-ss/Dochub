import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { makeApiCall, cloudinaryUpload } from '../../services/axios';
import { useSelector } from 'react-redux';
import Navbar from '../Common/Navbar/Navbar';
import Sidebar from '../Common/Sidebar/Sidebar';

const AddBlog = () => {
    const userData = useSelector((state: any) => state.auth)
    const [title, setTitle] = useState('');
    const [image, setImage] = useState<any>('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
  
    const addBlogHandler = async (e: any) => {
        e.preventDefault();
        try {
            if (!title) {
                toast.error('Title is required')
                return
            }
            if (title.length < 5) {
                toast.error('Title should be atleast 5 characters')
                return
            }

            if (!image) {
                toast.error('Image is required');
                return;
            }

            if (!content) {
                toast.error('Content is required')
                return
            }

            if (content.length < 20) {
                toast.error('Content should be atleast 20 characters')
                return
            }

            const file = new FormData();
            file.append('file', image);

            file.append('upload_preset', 'Dochub-doctor');
            file.append('cloud_name', 'doc-hub');
            file.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);

            const imageUpload = await cloudinaryUpload.post('/upload', file, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = {
                data: {
                    title:title,
                    content:content,
                    imageUrl: imageUpload.data.secure_url,
                    doctorName:userData.user.name,
                    doctorId:userData.user.DoctorId,
                    doctorUrl:userData.user.photoURL
                    
                }
            };

            const addBlogs = async (credentials: { data: object }) => {
                return makeApiCall('/doctor/add-blogs', 'POST', credentials)
            }
            addBlogs(data).then(async (response) => {
                if (response.status) {
                    toast.success('Blog added successfully')
                    navigate('/doctor/blog')
                } else {
                    throw 'Something went wrong'
                }
            })

        } catch (error) {
            console.log(error)
            toast.error('something went wrong');
        }
    };

    return (
        <>
        <Navbar/>
        <Sidebar/>
        <div className='mt-2'>
            <Toaster />
            <section className="bg-white ">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">ADD BLOG</h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500  sm:text-xl">
                        You can add new Medical Blogs here and Health Suggestions here.
                    </p>

                    <form action="#" className="space-y-8">
                        <div>
                            <input
                                type="text"
                                id="title"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                placeholder="Title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="file"
                                id="image"
                                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Let us know how we can help you"
                                required
                                onChange={(e: any) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <textarea
                                id="content"
                                rows={9}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Blog Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            >
                                Enter Blog Contents Here
                            </textarea>
                        </div>
                        <button
                            type="submit"
                            className="py-3 px-5 text-sm font-medium text-center text-slate-100 rounded-lg bg-blue-500 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
                            onClick={(e) => addBlogHandler(e)}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </section>
        </div>
        </>
    );
}

export default AddBlog;