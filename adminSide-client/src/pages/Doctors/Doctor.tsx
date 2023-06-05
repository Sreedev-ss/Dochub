import React from 'react'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
import Navbar from '../../components/Common/Navbar/Navbar'
import { useDispatch } from 'react-redux'
import { hideAlert } from '../../config/Redux/alertSlice'
import DoctorList from '../../components/Doctor/DoctorList'

const Doctor = () => {
    const dispatch = useDispatch()
    dispatch(hideAlert())

    return (
        <>
            <Navbar />
            <Sidebar />
            <DoctorList/>
        </>
    )
}

export default Doctor
