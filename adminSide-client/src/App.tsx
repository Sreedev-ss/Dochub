import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login/Login"
import ProtectedRoute from "./auth/protectedRoute"
import Home from "./pages/Home/Home"
import { useSelector } from "react-redux"
import Loading from "./components/Common/Loading/loading"
import Alert from "./components/Common/alert/alert"
import PageNotFound from "./pages/PageNotFound/PageNotFound"
import Doctor from "./pages/Doctors/Doctor"
import DoctorDetails from "./pages/DoctorDetails/DoctorDetails"
import AddDoctor from "./pages/AddDoctor/AddDoctor"
import AddDepartmentForm from "./components/Doctor/AddDepartment"


function App() {
  const { isloading } = useSelector((state: any) => state.loading)
  const { show } = useSelector((state: any) => state.alert)
  return (
    <>
      {isloading && <Loading />}
      {show && <Alert />}
      <Routes>
        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/admin/doctors' element={<ProtectedRoute><Doctor /></ProtectedRoute>} />
        <Route path='/admin/add-doctor' element={<ProtectedRoute><AddDoctor /></ProtectedRoute>} />
        <Route path='/admin/add-department' element={<ProtectedRoute><AddDepartmentForm /></ProtectedRoute>} />
        <Route path='/admin/doctor/:id' element={<ProtectedRoute><DoctorDetails /></ProtectedRoute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
