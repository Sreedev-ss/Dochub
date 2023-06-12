import Sidebar from '../../components/Common/Sidebar/Sidebar'
import Navbar from '../../components/Common/Navbar/Navbar'
import Appointments from '../../components/Appointments/Appointments'
import { useDispatch } from 'react-redux'
import { hideAlert } from '../../config/Redux/alertSlice'
import ErrorBoundary from '../../util/ErrorBoundary'
 

const DoctorAppointments = () => {
  const dispatch = useDispatch()
  dispatch(hideAlert())
  return (
    <>
      <ErrorBoundary>
        <Navbar/>
        </ErrorBoundary>
        <ErrorBoundary>
        <Sidebar/>
        </ErrorBoundary>
        <ErrorBoundary>
        <Appointments/>
        </ErrorBoundary>
    </>
  )
}

export default DoctorAppointments
