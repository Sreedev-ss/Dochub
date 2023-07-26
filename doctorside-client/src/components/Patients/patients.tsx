import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeApiCall } from '../../services/axios'
import { hideLoading, showLoading } from '../../config/Redux/loadingSlice'
import { useNavigate } from 'react-router-dom'

const Patients = () => {
    const { user } = useSelector((state: any) => state.auth)
    const dispatch = useDispatch()
    const [patients, setPatients] = useState([])
    const [appointments, setAppointment] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        async function getAllAppointment() {
            try {
                const getAppointment = async () => {
                    return makeApiCall(`/doctor/all-appointment?id=${encodeURIComponent(user.DoctorId)}&role=${encodeURIComponent('doctor')}`, 'GET');
                };
                const { data } = await getAppointment()
                setAppointment(data)
                const uniqueIds = new Set();
                const filteredArray = data.filter((item: any) => {
                    if (!uniqueIds.has(item.patientId)) {
                        uniqueIds.add(item.patientId);
                        return true;
                    }
                    return false;
                });
                setPatients(filteredArray)
                dispatch(hideLoading())
            } catch (error) {
                dispatch(hideLoading())
            }
        }
        dispatch(showLoading())
        getAllAppointment()

    }, [])

    return (
        <div className="bg-white mt-2 mx-1 p-8 rounded-md w-full">
            <div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Sl.no
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Patient
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Last Appointment
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Symptom
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Prescription
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.length ? patients?.map((items: any, i) => (
                                    <tr className=''>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img className="w-full h-full rounded-full"
                                                        src="/doctor_illustration.avif"
                                                        alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 font-bold whitespace-no-wrap">
                                                        {i + 1}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {items.name}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {items.createdAt}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {items.symptoms}
                                            </p>
                                        </td>

                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden
                                                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span className="relative" onClick={() => navigate(`/doctor/mypatients/add-prescription/${items.patientId}`)}>Add Prescription</span>
                                            </span>
                                        </td>
                                    </tr>
                                )) : <tr>
                                    <td className="px-5 py-5 border-b items-center border-gray-200 bg-white text-lg"><h1></h1></td>
                                    <td className="px-5 py-5 border-b items-center border-gray-200 bg-white text-lg"><h1></h1></td>
                                    <td className="px-5 py-5 border-b items-center border-gray-200 bg-white text-lg"><h1>No patients left</h1></td>
                                    <td className="px-5 py-5 border-b items-center border-gray-200 bg-white text-lg"><h1></h1></td>
                                </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Patients
