import './App.css'
import { Route, Routes } from 'react-router-dom'
import DoctorHome from './pages/DoctorHome/DoctorHome'
import DoctorAppointments from './pages/DoctorAppointments/DoctorAppointments'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import Login from './pages/Login/Login'

function App() {

  return (
    <>
      <Routes>
        <Route path='/doctor/login' element={<Login />} />
        <Route path='/doctor' element={<DoctorHome />} />
        <Route path='/doctor/appointments' element={<DoctorAppointments/>} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
