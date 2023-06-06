import Navbar from '../../components/Common/Navbar/Navbar'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
import Dashboard from '../../components/DoctorHome/Dashboard'
import ErrorBoundary from '../../util/ErrorBoundary'
import './DoctorHome.scss'

const DoctorHome = () => {
  return (
    <>
       <ErrorBoundary>
        <Navbar/>
        </ErrorBoundary>
        <ErrorBoundary>
        <Sidebar/>
        </ErrorBoundary>
        <ErrorBoundary>
        <Dashboard/>
        </ErrorBoundary>
    </>
  )
}

export default DoctorHome
