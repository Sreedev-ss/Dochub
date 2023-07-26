import './App.css'
import Home from './Pages/Home/Home'
import Doctor from './Pages/Doctor/Doctor'
import { Route, Routes } from 'react-router-dom'
import PageNotFound from './Pages/PageNotFound/PageNotFound'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'
import Loading from './components/Common/Loading/loading'
import { useSelector } from 'react-redux'
import ProtectedRoute from './auth/protectedRoute'
import Alert from './components/Common/alert/alert'
import Schedule from './Pages/Schedule/Schedule'
import PaymentSuccess from './components/Common/success/success'
import Appointment from './Pages/Appointments/Appointment'
import Chat from './Pages/Chat/Chat'
import Blog from './Pages/Blog/Blog'

function App() {
  const { isloading } = useSelector((state: any) => state.loading)
  const { loading } = useSelector((state: any) => state.auth)
  const { show } = useSelector((state: any) => state.alert)

  return (
    <>
      {isloading && <Loading />}
      {loading && <Loading />}
      {show && <Alert />}
      <Routes>
        <Route path='/' element={
          <Home />
        } />
        <Route path='/doctors' element={
          <Doctor />
        } />
        <Route path='/doctors/schedule/:id' element={
          <ProtectedRoute>
            <Schedule />
          </ProtectedRoute>
        } />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/success' element={<ProtectedRoute><PaymentSuccess/></ProtectedRoute>} />
        <Route path='/chat' element={<ProtectedRoute><Chat/></ProtectedRoute>} />
        <Route path='/blog' element={<ProtectedRoute><Blog/></ProtectedRoute>} />
        <Route path='/cancel' element={'Payment failed'} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/appointments' element={ <ProtectedRoute><Appointment /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
