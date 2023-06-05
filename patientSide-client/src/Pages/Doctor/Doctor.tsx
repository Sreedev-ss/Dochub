import React from 'react'
import Navbar from '../../components/Common/Navbar/Navbar'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
import DoctorList from '../../components/DoctorComponents/DoctorList/DoctorList'
import { hideAlert } from '../../config/Redux/alertSlice'
import { useDispatch } from 'react-redux'
import ErrorBoundary from '../../util/ErrorBoundary'


const Doctor = () => {
  const dispatch = useDispatch()
  dispatch(hideAlert())
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="mt-2 flex flex-grow">
        <Sidebar />
        <div className="flex-grow mx-2">
          <ErrorBoundary>
            <DoctorList />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default Doctor
