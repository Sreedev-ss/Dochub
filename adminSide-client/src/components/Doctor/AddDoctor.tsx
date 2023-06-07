import React, { useEffect, useState } from 'react'
import { Box, TextField, Button, FormControlLabel, RadioGroup, Radio, Chip, Grid, FormControl, InputLabel, Select, MenuItem, OutlinedInput, FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextFieldVariants, InputAdornment, IconButton } from '@mui/material'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format } from 'date-fns';
import { cloudinaryUpload, makeApiCall } from '../../services/axios/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../config/Redux/loadingSlice';
import axios from 'axios';
import { useFormik } from 'formik';
import { doctorSchema } from '../../auth/yupValidation';
import { JSX } from 'react/jsx-runtime';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const AddDoctorForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [departments, setDepartments] = useState([])

    useEffect(() => {
        const getDepartment = async () => {
            return makeApiCall('/doctor/get-department', 'GET');
        };
        getDepartment().then(({ data }) => {
            setDepartments(data)
        })
    }, [])

    const [image, setImage] = useState('');

    const formik = useFormik({
        initialValues: {
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
            password: '',
            cpassword: ''
        },
        validationSchema: doctorSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {

            const file = new FormData();
            file.append('file', image);

            file.append('upload_preset', 'Dochub-doctor');
            file.append('cloud_name', 'doc-hub');
            file.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);

            try {
                if (image) {

                    const cloudLink = await cloudinaryUpload.post('/upload', file, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    dispatch(showLoading())
                    formik.values.photoURL = cloudLink.data.secure_url;
                    dispatch(hideLoading())

                }
                handleSubmit(formik.values)
            } catch (error: any) {
                console.log(error);

            }
        }
    })

    const handleSubmit = (doctor: any) => {
        dispatch(showLoading())
        const addDoctor = async (credentials: { doctor: string }) => {
            return makeApiCall('/doctor/add-doctor', 'POST', credentials);
        };
        addDoctor({ doctor }).then(() => {
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
            formik.setFieldValue('DOB', formattedDate)
        }
    }

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showcPassword, setShowcPassword] = useState<boolean>(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleTogglecPasswordVisibility = () => {
        setShowcPassword(!showcPassword);
    };


    return (
        <Box sx={{ display: 'flex', marginTop: 2, paddingY: 3, backgroundColor: 'white', width: '100%', justifyContent: 'center' }}>
             <div className="w-1/2 bg-white p-8">
        <h1 className="text-2xl font-bold mb-4">Add Doctor</h1>
        <p className="text-gray-700">
          Welcome to the Add doctor Page! Here, you can manage doctors and their information. Use the
          form on the right to add new doctors or update existing ones.
        </p>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Image Gallery</h2>
          <div className="grid grid-cols-3 gap-4">
            <img
              src="/imgGallery1.jpeg"
              alt="Doctor 1"
              className="w-full h-auto"
            />
            <img
              src="/imgGallery3.jpeg"
              alt="Doctor 2"
              className="w-full h-auto"
            />
            <img
              src="/imgGallery2.jpeg"
              alt="Doctor 3"
              className="w-full h-auto"
            />
          </div>
        </div>
        
      </div>
            <Box sx={{ maxWidth: 1000, marginLeft:10 }}>
                <form onSubmit={formik.handleSubmit}>
                    <Box display={'flex'} gap={2}>
                        <TextField name='name'
                            label="Name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            fullWidth
                            margin="normal"
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name} />
                        <FormControl fullWidth margin="normal">
                            <InputLabel variant='outlined' id="select-label">Specialization</InputLabel>
                            <Select
                                error={formik.touched.specialization && Boolean(formik.errors.specialization)}
                                variant='outlined'
                                labelId="select-label"
                                value={formik.values.specialization}
                                name='specialization'
                                onChange={formik.handleChange}
                                label="Specialization"
                                input={<OutlinedInput />}
                            >
                                {departments.map((items: any) => {
                                    return <MenuItem value={items.specialization}>{items.specialization}</MenuItem>

                                })}

                            </Select>
                            {formik.touched.specialization && formik.errors.specialization && <p className='text-[#d32f2f] text-xs'>Please select an option</p>}
                        </FormControl>
                        <TextField name='fees'
                            onChange={formik.handleChange}
                            value={formik.values.fees}
                            label="Fees"
                            fullWidth
                            margin="normal"
                            onBlur={formik.handleBlur}
                            error={formik.touched.fees && Boolean(formik.errors.fees)}
                            helperText={formik.touched.fees && formik.errors.fees} />
                    </Box>
                    <TextField name='address'
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        label="Address"
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                        onBlur={formik.handleBlur}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address} />
                    <Box display={'flex'} gap={2}>
                        <TextField name='email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            label="Email"
                            fullWidth
                            margin="normal"
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email} />
                        <TextField name='mobile'
                            onChange={formik.handleChange}
                            value={formik.values.mobile}
                            label="Mobile"
                            fullWidth
                            margin="normal"
                            onBlur={formik.handleBlur}
                            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                            helperText={formik.touched.mobile && formik.errors.mobile} />
                    </Box>
                    <Box display={'flex'} gap={2}>
                        <TextField name='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            label="Password"
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            margin="normal"
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }} />
                        <TextField name='cpassword'
                            onChange={formik.handleChange}
                            value={formik.values.cpassword}
                            label="Confirm Password"
                            fullWidth
                            margin="normal"
                            onBlur={formik.handleBlur}
                            error={formik.touched.cpassword && Boolean(formik.errors.cpassword)}
                            helperText={formik.touched.cpassword && formik.errors.cpassword} 
                            type={showcPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglecPasswordVisibility} edge="end">
                                            {showcPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }} gap={3}>
                        <div className='flex flex-col gap-1'>
                            {formik.touched.sex && formik.errors.sex && <p className='text-[#d32f2f] text-xs'>{formik.errors.worktime}</p>}
                            <RadioGroup name="sex" onChange={formik.handleChange} value={formik.values.sex}>
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </div>
                        <FormControl fullWidth>
                            {formik.touched.worktime && formik.errors.worktime && <p className='text-[#d32f2f] text-xs mb-2'>{formik.errors.worktime}</p>}
                            <InputLabel id="select-label">Work Time</InputLabel>
                            <Select
                                error={formik.touched.worktime && Boolean(formik.errors.worktime)}
                                onChange={formik.handleChange}
                                variant='outlined'
                                labelId="select-label"
                                value={formik.values.worktime}
                                name='worktime'
                                label="Work Time"
                                input={<OutlinedInput />}
                            >
                                <MenuItem value="Day 9AM - 5PM">Day 9AM - 5PM</MenuItem>
                                <MenuItem value="Evening 4PM - 7PM">Evening 4PM - 7PM</MenuItem>
                                <MenuItem value="Night 7PM - 9PM">Night 7PM - 9PM</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="flex flex-col gap-2">
                            {formik.touched.DOB && formik.errors.DOB && <p className='text-[#d32f2f] text-xs'>{formik.errors.DOB}</p>}
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker label='DOB' format='dd/MM/yyyy' onChange={handleDob} />
                            </LocalizationProvider>
                        </div>
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
                    <TextField
                        name='about'
                        onChange={formik.handleChange}
                        value={formik.values.about}
                        label="About"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        onBlur={formik.handleBlur}
                        error={formik.touched.about && Boolean(formik.errors.about)}
                        helperText={formik.touched.about && formik.errors.about} />
                    <div className="mb-6 pt-4">
                        <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                            Upload Profile
                        </label>
                        <img
                            src={
                                formik.values.photoURL
                                || (image ? URL.createObjectURL(image as unknown as Blob) : '/default-profile.png')
                            }
                            alt=""
                            className="w-10 mb-5 h-10 rounded-full"
                        />
                        <div className="mb-8">
                            <input type="file" onChange={(e: any) => setImage(e.target.files[0])} name="file" id="file" className="sr-only" />
                            <label htmlFor='file' className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                                <div>
                                    <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                        Drop files here
                                    </span>
                                    <span className="mb-2 block text-base font-medium text-[#6B7280]">
                                        Or
                                    </span>
                                    <span
                                        className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
                                    >
                                        Browse
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Add Doctor
                    </Button>
                </form>
            </Box>
        </Box>
    )
}
export default AddDoctorForm
