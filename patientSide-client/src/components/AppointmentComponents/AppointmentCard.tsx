import React, { useEffect, useState } from 'react'
import { makeApiCall } from '../../services/axios/axios';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../config/Redux/loadingSlice';
import { IAppointment } from '../../util/interfaces';
import withPagination from '../HOC/paginate'

const AppointmentCard = ({ startIndex, endIndex, goToPage, currentPage }: any) => {
    const { user } = useSelector((state: any) => state.auth)
    const dispatch = useDispatch()

    const [appointments, setAppointment] = useState<IAppointment[]>([])

    useEffect(() => {
        async function getAllAppointment() {
            try {
                const getAppointment = async () => {
                    return makeApiCall(`/doctor/all-appointment?id=${encodeURIComponent(user._id)}&role=${encodeURIComponent('patient')}&skip=${startIndex}&limit=${endIndex - startIndex}`, 'GET');
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

    }, [startIndex,endIndex])

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
        <React.Fragment>
            <h1 className='font-medium text-2xl mb-2 flex justify-start mx-3 tracking-widest'>Appointments</h1>
            {appointments.length ? appointments.map((items) => (
                <div className="mx-auto max-w-screen justify-center px-2 xl:px-0">
                    <div className="rounded-lg md:w-full">
                        <div className="justify-between mb-6 rounded-lg bg-white  shadow-md sm:flex sm:justify-start">
                            <img src={items.doctorProfile ? items.doctorProfile : '/dummyDoctor.jpeg'} alt="product-image" className="w-full p-6 rounded-lg sm:w-40" />
                            <div className="sm:ml-4 p-6 sm:flex sm:w-full sm:justify-around">
                                <div className="mt-5 sm:mt-0 flex flex-col items-start">
                                    <h2 className="text-lg font-bold text-gray-900">Dr. {items.doctorName}</h2>
                                    <p className="mt-1 text-xs text-gray-700">Booking Date: {items.date}</p>
                                    <p className="mt-1 text-xs text-gray-700">Booking Time: {convertTo12HourFormat(items.time)}</p>
                                    <p className="mt-1 text-xs text-gray-700">Payment:  <span
                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative">{items.payment ? 'Completed' : 'Pending'}</span>
                                    </span></p>
                                </div>
                                <div className="mt-6 sm:mt-0 flex flex-col items-start">
                                    <p className="mt-1 text-xs text-gray-700">Patient name: {items.name}</p>
                                    <p className="mt-1 text-xs text-gray-700">Age: {items.age}</p>
                                    <p className="mt-1 text-xs text-gray-700">Sex: {items.gender}</p>
                                </div>
                                <div className="mt-6 sm:mt-0 flex flex-col items-start">
                                    <p className="mt-1 text-xs text-gray-700">Symptoms:{items.symptoms}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )):<div className='flex max-w-screen items-center justify-center  bg-white  h-1/5'>
                <h1 className='text-xl'>No more appointments</h1>
                </div>}
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
        </React.Fragment>
    )
}

const PaginatedComponent = withPagination(AppointmentCard, 3);
export default PaginatedComponent
