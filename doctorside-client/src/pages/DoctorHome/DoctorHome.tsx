import Navbar from '../../components/Common/Navbar/Navbar'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
import Dashboard from '../../components/DoctorHome/Dashboard'
import './DoctorHome.scss'

const DoctorHome = () => {
  return (
    <>
        <Navbar/>
        <Sidebar/>
        <Dashboard/>
    </>
  )
}

export default DoctorHome
