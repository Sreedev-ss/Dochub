import './App.css'
import { Route, Routes } from 'react-router-dom'
import DoctorHome from './pages/DoctorHome/DoctorHome'
import DoctorAppointments from './pages/DoctorAppointments/DoctorAppointments'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import Login from './pages/Login/Login'
import ProtectedRoute from './auth/protectedRoute'
import { useSelector } from 'react-redux'
import Loading from './components/Common/Loading/loading'
import Alert from './components/Common/alert/alert'
import { lazy } from 'react'
import ErrorBoundary from './util/ErrorBoundary'
import AddDoctorForm from './components/Doctor/AddDoctor'
import DoctorChat from './pages/DoctorChat/DoctorChat'
import VideoChat from './pages/DoctorChat/DoctorVideoChat'
import DoctorPatient from './pages/DoctorPatients/DoctorPatient'
import AddPrescription from './components/Patients/AddPrescription'
import DoctorBlog from './pages/DoctorBlog/DoctorBlog'
import AddBlog from './components/Blog/AddBlog'

function App() {
  const { isloading } = useSelector((state: any) => state.loading)
  const { show } = useSelector((state: any) => state.alert)
  return (
    <>
      {isloading && <Loading />}
      {show && <Alert />}
      <Routes>
        <Route path='/doctor/login' element={<Login />} />
        <Route path='/doctor/add-doctor' element={
          <ErrorBoundary>
            <AddDoctorForm />
          </ErrorBoundary>} />
        <Route path='/doctor' element={<ProtectedRoute><DoctorHome /></ProtectedRoute>} />
        <Route path='/doctor/chats' element={
          <ProtectedRoute><DoctorChat /></ProtectedRoute>} />
        <Route path='/doctor/appointments' element={
          <ProtectedRoute>
            <DoctorAppointments />
          </ProtectedRoute>
        } />
        <Route path='/doctor/mypatients' element={
          <ProtectedRoute>
            <DoctorPatient />
          </ProtectedRoute>
        } />
        <Route path='/doctor/blog' element={
          <ProtectedRoute>
            <DoctorBlog />
          </ProtectedRoute>
        } />
        <Route path='/doctor/blog/add-blog' element={
          <ProtectedRoute>
            <AddBlog/>
          </ProtectedRoute>
        } />
        <Route path='/doctor/mypatients/add-prescription/:id' element={
          <ProtectedRoute>
            <AddPrescription />
          </ProtectedRoute>
        } />
        <Route path='/doctor/create-room/:roomId' element={
          <VideoChat />
        } />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
