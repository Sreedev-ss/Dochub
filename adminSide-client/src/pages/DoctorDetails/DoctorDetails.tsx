import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Common/Navbar/Navbar';
import Sidebar from '../../components/Common/Sidebar/Sidebar';
import ViewDoctorDetails from '../../components/Doctor/ViewDoctorDetails';

const DoctorDetails = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <>
            <Navbar />
            <Sidebar />
            <ViewDoctorDetails id = {id} />
        </>
    )
}

export default DoctorDetails
