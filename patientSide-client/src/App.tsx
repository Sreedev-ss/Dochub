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

function App() {
  const { isloading } = useSelector((state: any) => state.loading)
  const { show } = useSelector((state: any) => state.alert)
  return (
    <>
      {isloading && <Loading />}
      {show && <Alert />}
      <Routes>
        <Route path='/' element={
            <Home />
        } />
        <Route path='/doctors' element={
          <ProtectedRoute>
            <Doctor  />
          </ProtectedRoute>
        } />
        <Route path='/schedule' element={
          <ProtectedRoute>
            <Schedule  />
          </ProtectedRoute>
        } />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
