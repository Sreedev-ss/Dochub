import React, { useEffect, useState } from 'react'
import { makeApiCall } from '../../services/axios'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../../config/Redux/loadingSlice'
import { VideoChatOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { showAlert } from '../../config/Redux/alertSlice'
import withPagination from '../HOC/paginate'

const Appointments = ({ startIndex, endIndex, goToPage, currentPage }: any) => {
    const { user } = useSelector((state: any) => state.auth)
    const dispatch = useDispatch()
    interface IAppointment {
        name: string,
        age: string,
        doctorId: string,
        patientId: string,
        email: string,
        gender: string,
        mobile: string,
        symptoms: string,
        date: string,
        time: string,
        fees: number,
        payment: boolean,
        payment_intent: string,
        doctorName: string,
        doctorProfile: string
    }
    const navigate = useNavigate()

    const [appointments, setAppointment] = useState<IAppointment[]>([])

    useEffect(() => {
        async function getAllAppointment() {
            try {
                const getAppointment = async () => {
                    return makeApiCall(`/doctor/all-appointment?id=${encodeURIComponent(user.DoctorId)}&role=${encodeURIComponent('doctor')}&skip=${startIndex}&limit=${endIndex - startIndex}`, 'GET');
                };
                const { data } = await getAppointment()
                setAppointment(data)
                dispatch(hideLoading())
            } catch (error) {
                dispatch(hideLoading())
            }
        }
        dispatch(showLoading())
        getAllAppointment()

    }, [startIndex, endIndex])

    function convertTo12HourFormat(timeRange: string): string {
        const [start, end] = timeRange.split("-");

        const formattedStartTime = formatTime(start);
        const formattedEndTime = formatTime(end);

        function formatTime(hour: any): string {
            const meridiem = hour >= 12 ? "PM" : "AM";
            const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
            return `${formattedHour}${meridiem}`;
        }

        return `${formattedStartTime}-${formattedEndTime}`;
    }

    const handleVideoChat = (patientId: string, date: string) => {
        if (new Date(date).toLocaleDateString() == new Date().toLocaleDateString()) {
            navigate(`/doctor/create-room/${patientId}`)
        } else {

            dispatch(showAlert('Video call can be done only on appointment date'))
        }
    }

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
                                        Name
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Patient
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Schdeuled
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Time
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Symptom
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Video Chat
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Payment
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.length ? appointments?.map((items) => (
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
                                                        Dr.{items.doctorName}
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
                                                {items.date}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {convertTo12HourFormat(items.time)}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {items.symptoms}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap" onClick={() => handleVideoChat(items.patientId, items.date)}>
                                                <VideoChatOutlined />
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span
                                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden
                                                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span className="relative">{items.payment ? 'Completed' : 'Pending'}</span>
                                            </span>
                                        </td>
                                    </tr>
                                )) : <tr>
                                    <td className="px-5 py-5 border-b items-center border-gray-200 bg-white text-lg"><h1></h1></td>
                                    <td className="px-5 py-5 border-b items-center border-gray-200 bg-white text-lg"><h1></h1></td>
                                    <td className="px-5 py-5 border-b items-center border-gray-200 bg-white text-lg"><h1></h1></td>
                                    <td className="px-5 py-5 border-b items-center border-gray-200 bg-white text-lg"><h1>No entries left</h1></td>
                                    <td className="px-5 py-5 border-b items-center border-gray-200 bg-white text-lg"><h1></h1></td>
                                    <td className="px-5 py-5 border-b items-center border-gray-200 bg-white text-lg"><h1></h1></td>
                                    <td className="px-5 py-5 border-b items-center border-gray-200 bg-white text-lg"><h1></h1></td>
                                </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="max-w-2xl  absolute bottom-10 right-10">

                <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px">
                        <li>
                            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}
                                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-white dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
                        </li>
                        <li>
                            <button
                                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-white dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{currentPage}</button>
                        </li>
                        <li>
                            <button onClick={() => goToPage(currentPage + 1)} disabled={appointments.length ? false : true}
                                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-white dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

const PaginatedComponent = withPagination(Appointments, 2);

export default PaginatedComponent
