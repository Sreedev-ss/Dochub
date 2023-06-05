import { Avatar, Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { docServer } from '../../services/axios/axios'
import { hideLoading } from '../../config/Redux/loadingSlice'


interface Doctor {
    name: string;
    address: string;
    mobile: string;
    fees: string;
    specialization: string;
    gender: string;
    DOB: string
    about: string;
    photoURL: string;
    role: string,
    worktime: string
}


const ViewDoctorDetails = ({ id }: any) => {
    const [doctorData, setDoctorData] = useState<Doctor>()
    const dispatch = useDispatch()

    useEffect(() => {
        docServer.get(`/get-doctor-details/${id}`).then(({ data }) => {
            dispatch(hideLoading())
            setDoctorData(data)
        })
    }, [])


    return (
        <Box sx={{ display: 'flex', backgroundColor: 'white', width: '100%', flexDirection: 'row', gap: 13, paddingX: 20, paddingY: 8, marginTop: 2, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Avatar src='dummyDoctor.jpeg' alt={doctorData?.name} sx={{ width: 100, height: 100, mb: 2 }} />
                <Typography variant="h5">Dr. {doctorData?.name}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {doctorData?.address}
                </Typography>
            </Box>
            <Box >
                <Typography sx={{ marginTop: 1 }} variant="body1">Mob: {doctorData?.mobile}</Typography>
                <Typography sx={{ marginTop: 1 }} variant="body1">Fees: {doctorData?.fees}</Typography>
                <Typography sx={{ marginTop: 1 }} variant="body1">Specialization: {doctorData?.specialization}</Typography>
                <Typography sx={{ marginTop: 1 }} variant="body1">DOB: {doctorData?.DOB} </Typography>
                <Typography sx={{ marginTop: 1 }} variant="body1">Sex: {doctorData?.gender} </Typography>
                <Typography sx={{ marginTop: 1 }} variant="body1">About: {doctorData?.about}</Typography>
                <div className="flex gap-x-3 mt-3">
                    <Button variant="contained" color="primary" >
                        Edit
                    </Button>
                    <Button variant="contained" color="secondary" >
                        Delete
                    </Button>
                </div>
            </Box>
            <Box>
                <Typography variant="body1">WorkTime: {doctorData?.worktime}</Typography>
            </Box>

        </Box>

    )
}

export default ViewDoctorDetails
