import React from 'react'
import ErrorBoundary from '../../util/ErrorBoundary'
import Navbar from '../../components/Common/Navbar/Navbar'
import Sidebar from '../../components/Common/Sidebar/Sidebar'
import PrescriptionPatient from '../../components/PrescriptionComponent/prescriptionPatient'

const Prescription = () => {
    return (
        <div className="flex flex-col ">
            <ErrorBoundary>
                <Navbar />
            </ErrorBoundary>
            <div className="mt-2 lg:flex lg:flex-grow">
                <Sidebar />
                <div className="xs:flex md:flex-grow mx-2">
                    <ErrorBoundary>
                        <PrescriptionPatient/>
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    )
}

export default Prescription
