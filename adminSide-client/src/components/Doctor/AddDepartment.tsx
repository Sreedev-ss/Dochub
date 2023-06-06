import React, { useState } from 'react'
import Navbar from '../Common/Navbar/Navbar'
import Sidebar from '../Common/Sidebar/Sidebar'
import { Button, TextField } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Sheet, Typography } from '@mui/joy'
import {  makeApiCall } from '../../services/axios/axios'
import { useNavigate } from 'react-router-dom'

const AddDepartmentForm = () => {
    const [department, setDepartment] = useState<string>('')
    const [departmentValid, setDepartmentValid] = useState({ valid: false, error: '' })
    const navigate = useNavigate()
    const handleSubmit = () => {
        if (department == '') {
            setDepartmentValid({ valid: true, error: 'This field cannot be empty' })
            return
        }
        setDepartmentValid({ valid: false, error: '' })
        const addDepartment = async (credentials: { department: string }) => {
            return makeApiCall('/doctor/add-department', 'POST', credentials);
        };
        addDepartment({ department }).then(({ data }) => {
            console.log(data);
            navigate('/admin/doctors')
        }).catch((err: any) => {
            console.log(err.message);

        })
    }
    return (
        <>
            <Navbar />
            <Sidebar />
            <main>
                <Sheet
                    sx={{
                        width: 500,
                        mx: 'auto',
                        my: 20,
                        py: 5,
                        px: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        borderRadius: 'sm',
                        boxShadow: 'md',
                    }}
                    variant="outlined"
                >
                    <div className='flex flex-col justify-center items-center'>
                        <Typography level="h4" component="h1">
                            <b>Add Department</b>
                        </Typography>
                        <div className='grid mt-3'>
                            <TextField helperText={departmentValid.error} error={departmentValid.valid} name='department' label="Department" fullWidth margin="normal" onChange={(e: any) => setDepartment(e.target.value)} />
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                            >
                                <CheckCircleIcon />
                            </Button>
                        </div>
                    </div>

                </Sheet>
            </main>
        </>
    )
}

export default AddDepartmentForm
