import React from 'react'
import ScheduleDoctor from '../../components/Schedule/scheduleDoctor'
import Navbar from '../../components/Common/Navbar/Navbar'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
import './Schedule.scss'
import { hideAlert } from '../../config/Redux/alertSlice'
import { useDispatch } from 'react-redux'
import ErrorBoundary from '../../util/ErrorBoundary'

const Schedule = () => {
    const dispatch = useDispatch()
    dispatch(hideAlert())
    return (

        <div className="flex flex-col h-screen">
        <ErrorBoundary>
          <Navbar />
        </ErrorBoundary>
        <div className="mt-2 lg:flex lg:flex-grow">
          <Sidebar />
          <div className="xs:flex md:flex-grow mx-2">
            <ErrorBoundary>
              <ScheduleDoctor />
            </ErrorBoundary>
          </div>
        </div>
      </div>

    )
}

export default Schedule
