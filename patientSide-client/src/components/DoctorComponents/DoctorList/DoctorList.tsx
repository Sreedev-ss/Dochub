import React, { useEffect, useState } from 'react'
import { makeApiCall } from '../../../services/axios/axios'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../../config/Redux/loadingSlice'
import { useNavigate } from 'react-router-dom'

const DoctorList = () => {
    const [doctors, setDoctors] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const getDoctor = async () => {
            const doctorServer = async () => {
                return makeApiCall('/doctor/all-doctor', 'GET' );
            };
            const { data }: any = await doctorServer()
            setDoctors(data)
            dispatch(hideLoading())
        }
        dispatch(showLoading())
        getDoctor()
    }, [])
    const categories = [...new Set(doctors.map(item => item["specialization"]))]

    return (
        <React.Fragment>
                <div className='doctor overflow-hidden w-screen md:w-full' >
                    <h1 className='font-medium text-2xl flex justify-start mx-3 tracking-widest'>Doctors</h1>
                    {doctors.length === 0 &&
                        <div className='mt-10 '><h1 className="text-2xl">No doctors found</h1></div>}
                    {categories.map(category => (
                        <div key={category} className="doctorList h-44 p-5 gap-10 rounded-lg flex items-center bg-white ml-1 mr-3 mt-3">
                            <div className='flex flex-col w-24 align-middle justify-center items-center'>
                                <h1 className='mx-7 text-xl font-medium'>{category}</h1>
                                <button className='border w-20 rounded-lg hover:bg-orange-200 hover:transition-all text-sm text-orange-500 border-orange-200 bg-transparent'>View all</button>
                            </div>
                            <div className="list flex overflow-scroll">
                                {doctors
                                    .filter(item => item["specialization"] === category)
                                    .map(item => (
                                        <div key={item["DoctorId"]} className="doctorDisp  w-44 bg-white flex flex-col items-center justify-center shadow-2xl box">
                                            <img src={item["photoURL"] ? item["photoURL"]  :'/dummyDoctor.jpeg'} className='w-20 h-20' alt="" />
                                            <h1 className='text-sm'>{`Dr. ${item["name"]}`}</h1>
                                            <button onClick={()=>navigate(`/doctors/schedule/${item['_id']}`)} className='bg-gray-600 text-white w-36 text-xs mx-7 rounded-sm'>See availability</button>
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
