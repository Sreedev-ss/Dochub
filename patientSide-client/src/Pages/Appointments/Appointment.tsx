import React from 'react'
import Navbar from '../../components/Common/Navbar/Navbar'
import ErrorBoundary from '../../util/ErrorBoundary'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
import AppointmentCard from '../../components/AppointmentComponents/AppointmentCard'

const Appointment = () => {
  return (
    <div className="flex flex-col h-screen">
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
      <div className="mt-2 flex flex-grow">
        <Sidebar />
        <div className="flex-grow">
          <ErrorBoundary>
            <AppointmentCard/>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default Appointment
