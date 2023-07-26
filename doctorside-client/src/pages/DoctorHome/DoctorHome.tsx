import { useEffect, useState } from 'react'
import Navbar from '../../components/Common/Navbar/Navbar'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
import Dashboard from '../../components/DoctorHome/Dashboard'
import ErrorBoundary from '../../util/ErrorBoundary'
import { makeApiCall } from '../../services/axios'
import { useSelector } from 'react-redux'

const DoctorHome = () => {
  const [totalPatients, setTotal] = useState(0)
  const [revenue, setRevenue] = useState(0)
  const [male, setMale] = useState()
  const [female, setFemale] = useState()
  const [symptomType , setSymptomType] = useState()

  const { user } = useSelector((state: any) => state.auth)

  useEffect(() => {
    const fetchPatients = async () => {
      const patients = async () => {
        return makeApiCall(`/doctor/get-patients/${user.DoctorId}`, 'GET')
      }
      const { data } = await patients()
      setMale(data[0]?.male)
      setFemale(data[0]?.female)
      setTotal(data[0]?.total)
    }

    const fetchRevenue = async () => {
      const revenue = async () => {
        return makeApiCall(`/doctor/get-totalRevenue/${user.DoctorId}`, 'GET')
      }
      const { data } = await revenue()
      setRevenue(data[0]?.totalPrice)
    }
    const fetchSymptom = async() => {
      const symptom = async () => {
          return makeApiCall(`/doctor/get-symptomTypes/${user.DoctorId}`, 'GET')
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
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
      <ErrorBoundary>
        <Sidebar />
      </ErrorBoundary>
      <ErrorBoundary>
        <Dashboard totalPatients={totalPatients} revenue={revenue} male={male} female={female} symptomType={symptomType}/>
      </ErrorBoundary>
    </>
  )
}

export default DoctorHome
