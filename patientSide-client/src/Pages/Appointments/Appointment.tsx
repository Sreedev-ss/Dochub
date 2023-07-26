import Navbar from '../../components/Common/Navbar/Navbar'
import ErrorBoundary from '../../util/ErrorBoundary'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
import PaginatedComponent from '../../components/AppointmentComponents/AppointmentCard'

const Appointment = () => {
  return (
    <div className="flex flex-col ">
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
      <div className="mt-2 lg:flex lg:flex-grow">
        <Sidebar />
        <div className="xs:flex md:flex-grow mx-2">
          <ErrorBoundary>
            <PaginatedComponent />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default Appointment
