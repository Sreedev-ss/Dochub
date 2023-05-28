import React from 'react'
import ScheduleDoctor from '../../components/Schedule/scheduleDoctor'
import Navbar from '../../components/Common/Navbar/Navbar'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
import './Schedule.scss'

const Schedule = () => {
    return (
        <div className="container-schedule">
            <Navbar />
            <Sidebar />
            <ScheduleDoctor />
        </div>
    )
}

export default Schedule
