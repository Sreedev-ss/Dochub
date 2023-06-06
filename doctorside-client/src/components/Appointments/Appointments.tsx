import React, { useEffect, useState } from 'react'
import { makeApiCall } from '../../services/axios'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../../config/Redux/loadingSlice'

const appointments = () => {
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

    const [appointments, setAppointment] = useState<IAppointment[]>([])

    useEffect(() => {
        async function getAllAppointment() {
            try {
                const getAppointment = async () => {
                    return makeApiCall(`/doctor/all-appointment?id=${encodeURIComponent(user.data.DoctorId)}&role=${encodeURIComponent('doctor')}`, 'GET');
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

    }, [])

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
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Patient
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Schdeuled
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Time
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Symptom
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Payment
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {appointments.map((items) => (
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
                                        <span
                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                            <span aria-hidden
                                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                            <span className="relative">{items.payment ? 'Completed': 'Pending' }</span>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {/* <div
                            className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                            <span className="text-xs xs:text-sm text-gray-900">
                                Showing 1 to 4 of 50 Entries
                            </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                                <button
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                    Prev
                                </button>
                                &nbsp; &nbsp;
                                <button
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                    Next
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default appointments
