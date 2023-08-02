import React, { useEffect, useState } from 'react'
import { makeApiCall } from '../../services/axios/axios';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../config/Redux/loadingSlice';
import { IPrescription } from '../../util/interfaces';

const PrescriptionPatient = () => {
    const { user } = useSelector((state: any) => state.auth)
    const dispatch = useDispatch()
    const [prescriptions, setPrescription] = useState<IPrescription[]>([])

    useEffect(() => {
        async function getPrescritonDetails() {
            try {
                const getPrescriptions = async (credentials:{data:string}) => {
                    return makeApiCall(`/doctor/get-prescription`, 'POST', credentials);
                };
                const { data } = await getPrescriptions({data:user._id})
                console.log(data)
                setPrescription(data)
                dispatch(hideLoading())
            } catch (error) {
                dispatch(hideLoading())
            }
        }
        dispatch(showLoading())
        getPrescritonDetails()

    }, [])

    function formatDate(createdAt:string) {
        const dateObj = new Date(createdAt);
        const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${dateObj.getFullYear()} ${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(2, '0')}:${String(dateObj.getSeconds()).padStart(2, '0')}`;
        return formattedDate;
      }

    return (
        <React.Fragment>
            <h1 className='font-medium text-2xl mb-2 flex justify-start mx-3 tracking-widest'>Prescriptions</h1>
            {prescriptions.length ? prescriptions.map((items) => (
                <div className="mx-auto max-w-screen justify-center px-2 xl:px-0">
                    <div className="rounded-lg md:w-full">
                        <div className="justify-between mb-6 rounded-lg bg-white  shadow-md sm:flex sm:justify-start">
                            <img src={'/dummyDoctor.jpeg'} alt="product-image" className="w-full p-6 rounded-lg sm:w-40" />
                            <div className="sm:ml-4 p-6 sm:flex sm:w-full sm:justify-around">
                                <div className="mt-5 sm:mt-0 flex flex-col items-start">
                                    <h2 className="text-lg font-bold text-gray-900">Dr. {items.doctorName}</h2>
                                    <p className="mt-1 text-xs text-gray-700">Medicine: {items.medicine}</p>
                                    <p className="mt-1 text-xs text-gray-700">Dosage: {items.dosage}</p>
                                </div>

                                <div className="mt-6 sm:mt-0 flex flex-col items-start">
                                    <p className="mt-1 text-xs text-gray-700">Notes: {items.notes}</p>
                                    <p className="mt-1 text-xs text-gray-700">Issued: {formatDate(items.createdAt)}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )):<div className='flex max-w-screen items-center justify-center  bg-white  h-1/5'>
                <h1 className='text-xl'>No Prescriptions</h1>
                </div>}
        </React.Fragment>
    )
}

export default PrescriptionPatient
