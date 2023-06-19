import express from 'express'
import { authenticateToken } from '../service/jwtVerify'
import {
    registerDoctor,
    getAllDoctor,
    getDoctor,
    getDoctorById,
    addDepartment,
    getDepartment,
    getDoctorRequest,
    searchDoctor
} from '../controller/doctorController'
import {
    addAppointment,
    updatePayment,
    getAllAppointment,
    getAllAppointmentBydate
} from '../controller/appointmentController'
import {
    createChat,
    findChat,
    userChats
} from '../controller/chatController'
import {
    addMessage,
    getMessage
} from '../controller/messageController'


const app = express.Router()

app.post('/add-doctor', registerDoctor)
app.get('/search-doctor', searchDoctor)
app.get('/all-doctor', getAllDoctor)
app.get('/get-doctor/:email', getDoctor)
app.get('/get-doctor-details/:id', getDoctorById)
app.get('/get-doctor-requests', getDoctorRequest)

app.post('/add-department', addDepartment)
app.get('/get-department', getDepartment)

app.post('/add-appointment', addAppointment)
app.put('/update-payment-status', updatePayment)
app.get('/all-appointment', getAllAppointment)
app.post('/all-appointment-bydate', getAllAppointmentBydate)

app.post('/chat', createChat)
app.get('/chat/:userId', userChats)
app.get('/chat/find/:firstId/:secondId', findChat)

app.post('/message', addMessage)
app.get('/message/:chatId', getMessage)

export default app