import React from 'react'
import Navbar from '../../components/Common/Navbar/Navbar'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
import AddDoctorForm from '../../components/Doctor/AddDoctor'
import ErrorBoundary from '../../util/ErrorBoundary'

const AddDoctor = () => {
  return (
    <>
<ErrorBoundary>
    <Navbar/>
    <Sidebar/>
    <AddDoctorForm/>
    </ErrorBoundary>
    </>
  )
}

export default AddDoctor
