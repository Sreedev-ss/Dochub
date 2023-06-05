import React from 'react'
import Navbar from '../../components/Common/Navbar/Navbar'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
import AddDoctorForm from '../../components/Doctor/AddDoctor'

const AddDoctor = () => {
  return (
    <>
    <Navbar/>
    <Sidebar/>
    <AddDoctorForm/>
    </>
  )
}

export default AddDoctor
