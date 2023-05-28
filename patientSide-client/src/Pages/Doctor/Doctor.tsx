import React from 'react'
import './Doctor.scss'
import Navbar from '../../components/Common/Navbar/Navbar'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
import DoctorList from '../../components/DoctorComponents/DoctorList/DoctorList'
import { hideAlert } from '../../config/Redux/alertSlice'
import { useDispatch } from 'react-redux'

const Doctor = () => {
  const dispatch = useDispatch()
  dispatch(hideAlert())
  return (
    <>
    <div className="container-doctor">
      <Navbar />
      <Sidebar />
      <DoctorList/>
      </div>
    </>
  )
}

export default Doctor
