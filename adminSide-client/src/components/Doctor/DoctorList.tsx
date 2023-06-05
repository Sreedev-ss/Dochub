import React, { useEffect, useState } from 'react'
import { docServer } from '../../services/axios/axios'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../config/Redux/loadingSlice'
import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const DoctorList = () => {
    const [doctors, setDoctors] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const getDoctor = async () => {
            const { data }: any = await docServer.get('/all-doctor');
            setDoctors(data)
            dispatch(hideLoading())
        }
        dispatch(showLoading())
        getDoctor()
    }, [])

    const categories = [...new Set(doctors.map(item => item["specialization"]))]
    const viewDetails = (id: string) => {
        dispatch(showLoading())
        navigate(`/admin/doctor/${id}`)
    }


    return (
        <React.Fragment>
            <div className='doctor mt-5'>
                <div className="flex px-2 justify-between">
                    <h1 className='font-extrabold text-2xl flex justify-start mx-3 tracking-widest'>Doctors</h1>
                    <div className="flex gap-4">
                        <button onClick={() => navigate('/admin/add-doctor')} className='border w-40 rounded-lg hover:bg-gray-200 hover:transition-all text-blue-500 border-blue-500 bg-transparent' >
                            Add Doctor
                        </button>
                        <button onClick={() => navigate('/admin/add-department')}  className='border w-40 rounded-lg hover:bg-gray-200 hover:transition-all text-blue-500 border-blue-500 bg-transparent' >
                            Add Department
                        </button>
                    </div>
                </div>
                {doctors.length === 0 &&
                    <div className='mt-10'><h1 className="text-2xl">No doctors found</h1></div>}

                {categories.map(category => (
                    <div key={category} className="doctorList p-5 gap-10 rounded-lg flex items-center bg-white ml-1 mr-3 mt-3">
                        <div className='flex flex-col align-middle items-center justify-center'>
                            <h1 className='mx-7 text-xl font-medium'>{category}</h1>
                            <button className='border w-20 rounded-lg hover:bg-gray-200 hover:transition-all text-sm text-blue-500 border-blue-200 bg-transparent'>View all</button>
                        </div>
                        <div className="list flex overflow-scroll cursor-pointer">
                            {doctors
                                .filter(item => item["specialization"] === category)
                                .map(item => (
                                    <div key={item["DoctorId"]} onClick={() => viewDetails(item["_id"])} className="doctorDisp w-44 bg-white flex flex-col items-center justify-center shadow-2xl h-44 box">
                                        <img src="/dummyDoctor.jpeg" className='w-28 h-28' alt="" />
                                        <h1 className='text-sm'>{`Dr. ${item["name"]}`}</h1>
                                        <button className='bg-gray-600 text-white w-36 text-xs mx-7 rounded-sm'>View details</button>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    )
}

export default DoctorList
