import React from 'react'
import ErrorBoundary from '../../util/ErrorBoundary'
import Navbar from '../../components/Common/Navbar/Navbar'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
import Patients from '../../components/Patients/patients'

const DoctorPatient = () => {
  return (
    <>
      <ErrorBoundary>
        <Navbar/>
        </ErrorBoundary>
        <ErrorBoundary>
        <Sidebar/>
        </ErrorBoundary>
        <ErrorBoundary>
        <Patients/>
        </ErrorBoundary>
    </>
  )
}

export default DoctorPatient
