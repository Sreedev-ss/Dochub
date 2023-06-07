import express from 'express'
const app = express.Router()
import {
    registerDoctor,
    getAllDoctor,
    getDoctor,
    getDoctorById,
    addDepartment,
    getDepartment,
} from '../controller/doctorController'

import {
    addAppointment,
    updatePayment,
    getAllAppointment,
    getAllAppointmentBydate
} from '../controller/appointmentController'

app.post('/add-doctor', registerDoctor)
app.get('/all-doctor', getAllDoctor)
app.get('/get-doctor/:email', getDoctor)
app.get('/get-doctor-details/:id', getDoctorById)
app.post('/add-department', addDepartment)
app.get('/get-department', getDepartment)
app.post('/add-appointment', addAppointment)
app.put('/update-payment-status', updatePayment)
app.get('/all-appointment', getAllAppointment)
app.post('/all-appointment-bydate', getAllAppointmentBydate)

export default app