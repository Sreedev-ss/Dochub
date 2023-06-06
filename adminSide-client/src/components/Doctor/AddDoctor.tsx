import React, { useEffect, useState } from 'react'
import { Box, TextField, Button, FormControlLabel, RadioGroup, Radio, Chip, Grid, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format } from 'date-fns';
import { makeApiCall } from '../../services/axios/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../config/Redux/loadingSlice';
import axios from 'axios';

import cloudinary from 'cloudinary-core';

interface Doctor {
    name: string;
    address: string;
    mobile: string;
    fees: string;
    specialization: string;
    sex: string;
    DOB: string
    about: string;
    photoURL: string;
    role: string,
    worktime: string,
    email: string,
    password: string
}

const AddDoctorForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [doctor, setDoctor] = useState<Doctor>({
        name: '',
        address: '',
        mobile: '',
        fees: '',
        specialization: '',
        sex: '',
        about: '',
        DOB: '',
        role: 'doctor',
        photoURL: '',
        worktime: '',
        email: '',
        password: ''
    })
    const [worktimeValue, setworktimeValue] = useState('');
    const [specializationValue, setspecializationValue] = useState('');
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        const getDepartment = async () => {
            return makeApiCall('/doctor/get-department', 'GET');
        };
        getDepartment().then(({ data }) => {
            setDepartments(data)
        })
    }, [])


    // const [uploadedImage, setUploadedImage] = useState<string>('');

    // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const image = e.target.files?.[0];
    //     if (image) {
    //         const file = new FormData();
    //         file.append('file', image);

    //         file.append('upload_preset', 'halo-doc-doctor-profile');
    //         file.append('cloud_name', 'halo-doc');
    //         file.append('api_key', import.meta.env.CLOUDINARY_API_KEY);

    //         const cloudLink = await cloudinaryUpload.post('/upload', file, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });

    //     }
    // };

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        if (name == "worktime") setworktimeValue(value)
        if (name == "specialization") setspecializationValue(value)
        if (name == 'cpassword' && value != doctor.password) {
            console.log('passwordIncorrect');
        }
        setDoctor((prevDoctor) => ({
            ...prevDoctor,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(showLoading())
        const addDoctor = async (credentials: { doctor: Doctor }) => {
            return makeApiCall('/doctor/add-doctor', 'POST', credentials);
        };
        addDoctor({ doctor }).then(({ data }) => {
            console.log(data);
            dispatch(hideLoading())
            navigate('/admin/doctors')
        }).catch((error: any) => {
            console.log(error.message);
            dispatch(hideLoading())
        })
    };

    // const handleDateChange = (date: Date | Date[] | null) => {
    //     if (date instanceof Date) {
    //         const formattedDate = format(new Date(date), 'dd-MM-yyyy'); 
    //         setDoctor((prevDoctor) => ({
    //             ...prevDoctor,
    //             schedule: [...prevDoctor.schedule, { date: formattedDate, startTime: 'df', endTime: 'df' }],
    //         }));
    //     } else if (Array.isArray(date)) {
    //         const formattedDates = date.map((d) => {
    //             const formattedDate = format(new Date(d), 'dd-MM-yyyy') 
    //             return { date: formattedDate, startTime: 'fg', endTime: 'sd' };
    //         });
    //         setDoctor((prevDoctor) => ({
    //             ...prevDoctor,
    //             schedule: [...prevDoctor.schedule, ...formattedDates],
    //         }));
    //     }
    // };

    // const handleStartTimeChange = (index: number, time: Date) => {
    //     setDoctor((prevDoctor) => {
    //         const updatedSchedule = [...prevDoctor.schedule];
    //         updatedSchedule[index].startTime = format(time, 'hh:mm a');
    //         return {
    //             ...prevDoctor,
    //             schedule: updatedSchedule,
    //         };
    //     });
    // };

    // const handleEndTimeChange = (index: number, time: Date) => {
    //     setDoctor((prevDoctor) => {
    //         const updatedSchedule = [...prevDoctor.schedule];
    //         updatedSchedule[index].endTime = format(time, 'hh:mm a');
    //         return {
    //             ...prevDoctor,
    //             schedule: updatedSchedule,
    //         };
    //     });
    // };

    // const handleRemoveDate = (index: number) => {
    //     setDoctor((prevDoctor) => {
    //         const updatedSchedule = [...prevDoctor.schedule];
    //         updatedSchedule.splice(index, 1);
    //         return {
    //             ...prevDoctor,
    //             schedule: updatedSchedule,
    //         };
    //     });
    // };

    const handleDob = (date: Date | null) => {
        if (date instanceof Date) {
            const formattedDate = format(new Date(date), 'dd-MM-yyyy');
            setDoctor((prevDoctor) => ({
                ...prevDoctor,
                DOB: formattedDate,
            }));
        }
    }

    return (
        <Box sx={{ display: 'flex', marginTop: 2, paddingY: 3, backgroundColor: 'white', width: '100%', justifyContent: 'center' }}>
            <Box sx={{ maxWidth: 1000 }}>
                <form onSubmit={handleSubmit}>
                    <Box display={'flex'} gap={2}>
                        <TextField name='name' label="Name" fullWidth margin="normal" onChange={handleInputChange} />
                        <FormControl fullWidth margin="normal">
                            <InputLabel variant='outlined' id="select-label">Specialization</InputLabel>
                            <Select
                                variant='outlined'
                                labelId="select-label"
                                value={specializationValue}
                                name='specialization'
                                onChange={handleInputChange}
                                label="Specialization"
                                input={<OutlinedInput />}
                            >
                                {departments.map((items: any) => {
                                    return <MenuItem value={items.specialization}>{items.specialization}</MenuItem>

                                })}

                            </Select>
                        </FormControl>
                        <TextField name='fees' label="Fees" fullWidth margin="normal" onChange={handleInputChange} />
                    </Box>
                    <TextField name='address' label="Address" multiline rows={4} fullWidth margin="normal" onChange={handleInputChange} />
                    <Box display={'flex'} gap={2}>
                        <TextField name='email' label="Email" fullWidth margin="normal" onChange={handleInputChange} />
                        <TextField name='mobile' label="Mobile" fullWidth margin="normal" onChange={handleInputChange} />
                    </Box>
                    <Box display={'flex'} gap={2}>

                        <TextField name='password' label="Password" fullWidth margin="normal" onChange={handleInputChange} />
                        <TextField name='cpassword' label="Confirm Password" fullWidth margin="normal" onChange={handleInputChange} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }} gap={3}>
                        <RadioGroup name="sex" value={doctor.sex} onChange={handleInputChange}>
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Work Time</InputLabel>
                            <Select
                                variant='outlined'
                                labelId="select-label"
                                value={worktimeValue}
                                name='worktime'
                                onChange={handleInputChange}
                                label="Work Time"
                                input={<OutlinedInput />}
                            >
                                <MenuItem value="Day 9AM - 5PM">Day 9AM - 5PM</MenuItem>
                                <MenuItem value="Evening 4PM - 7PM">Evening 4PM - 7PM</MenuItem>
                                <MenuItem value="Night 7PM - 9PM">Night 7PM - 9PM</MenuItem>
                            </Select>
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker label='DOB' format='dd/MM/yyyy' onChange={handleDob} />
                        </LocalizationProvider>
                    </Box>
                    {/* <Box sx={{ marginTop: 2 }}>
                        {doctor.schedule.map((date, index) => (
                            <Box key={index} sx={{ marginBottom: 2 }}>
                                <Chip
                                    label={date.date}
                                    onDelete={() => handleRemoveDate(index)}
                                    sx={{ marginRight: 1, marginBottom: 1 }}
                                />
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <TimePicker
                                                label="Start Time"
                                                value={date.startTime}
                                                onChange={(time: any) => handleStartTimeChange(index, time)}

                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <TimePicker
                                                label="End Time"
                                                defaultValue=''
                                                value={date.endTime}
                                                onChange={(time: any) => handleEndTimeChange(index, time)}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
                    </Box> */}
                    <TextField name='about' label="About" fullWidth multiline rows={4} margin="normal" onChange={handleInputChange} />
                    {/* <div>
                        {uploadedImage && <img src={uploadedImage} alt="Uploaded" />}
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                    </div> */}
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Add Doctor
                    </Button>
                </form>
            </Box>
        </Box>
    )
}
export default AddDoctorForm
