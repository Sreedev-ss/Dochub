import './App.css'
import { Route, Routes } from 'react-router-dom'
import DoctorHome from './pages/DoctorHome/DoctorHome'
import DoctorAppointments from './pages/DoctorAppointments/DoctorAppointments'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import Login from './pages/Login/Login'
import ProtectedRoute from './auth/protectedRoute'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './components/Common/Loading/loading'
import Alert from './components/Common/alert/alert'
import AddDoctorForm from './components/Doctor/AddDoctor'

function App() {
  const { isloading } = useSelector((state: any) => state.loading)
  const { show } = useSelector((state: any) => state.alert)
  return (
    <>
      {isloading && <Loading />}
      {/* {show && <Alert />} */}
      <Routes>
        <Route path='/doctor/login' element={<Login />} />
        <Route path='/doctor/add-doctor' element={<AddDoctorForm />} />
        <Route path='/doctor' element={<ProtectedRoute><DoctorHome/></ProtectedRoute>} />
        <Route path='/doctor/appointments' element={
          <ProtectedRoute>
            <DoctorAppointments />
          </ProtectedRoute>
        } />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
