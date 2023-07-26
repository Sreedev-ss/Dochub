import { useDispatch } from 'react-redux'
import Navbar from '../../components/Common/Navbar/Navbar'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
import { hideAlert } from '../../config/Redux/alertSlice'
import Dashboard from '../../components/Home/Dashboard'
import { useEffect, useState } from 'react'
import { makeApiCall } from '../../services/axios/axios'

const Home = () => {
    const dispatch = useDispatch()
    const [totalPatients, setTotal] = useState(0)
    const [revenue, setRevenue] = useState(0)
    const [gender, setGender] = useState()
    const [symptomType , setSymptomType] = useState()
  
    dispatch(hideAlert())

    useEffect(() => {
      const fetchPatients = async () => {
        const patients = async () => {
          return makeApiCall(`/doctor/get-allpatients`, 'GET')
        }
        const { data } = await patients()
        setGender(data)
        setTotal(data[0]?.total+data[1]?.total)
      }
  
      const fetchRevenue = async () => {
        const revenue = async () => {
          return makeApiCall(`/doctor/get-fullRevenue`, 'GET')
        }
        const { data } = await revenue()
        setRevenue(data[0]?.totalPrice)
      }
      
      const fetchSymptom = async() => {
        const symptom = async () => {
            return makeApiCall(`/doctor/get-fullSymptomTypes`, 'GET')
          }
          const {data} = await symptom()
          setSymptomType(data)
      }
      fetchSymptom()
      fetchPatients()
      fetchRevenue()
    }, [])
  
    return (
        <>
            <Navbar />
            <Sidebar />
            <Dashboard totalPatients={totalPatients} revenue={revenue} gender={gender} symptomType={symptomType}/>
        </>
    )
}

export default Home
