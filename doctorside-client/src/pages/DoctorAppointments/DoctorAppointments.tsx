import Sidebar from '../../components/Common/Sidebar/Sidebar'
import Navbar from '../../components/Common/Navbar/Navbar'
import ErrorBoundary from '../../util/ErrorBoundary'
import PaginatedComponent from '../../components/Appointments/Appointments'
 

const DoctorAppointments = () => {
  return (
    <>
      <ErrorBoundary>
        <Navbar/>
        </ErrorBoundary>
        <ErrorBoundary>
        <Sidebar/>
        </ErrorBoundary>
        <ErrorBoundary>
        <PaginatedComponent/>
        </ErrorBoundary>
    </>
  )
}

export default DoctorAppointments
