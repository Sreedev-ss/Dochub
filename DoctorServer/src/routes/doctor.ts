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
    searchDoctor,
    getPatientCount,
    getTotalRevenue,
    getMontlyRevenue,
    getYearlyRevenue,
    getSymptomType,
    addPrescription
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
import { fullSymptomTypes, getAllPatientCount, getFullMontlyRevenue, getFullRevenue, getFullYearRevenue } from '../controller/adminController'
import { addBlog, getAllBlogs, getDoctorBlogs } from '../controller/blogController'


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

app.post('/add-prescription',addPrescription)

app.get('/get-patients/:doctorId',getPatientCount)
app.get('/get-totalRevenue/:doctorId',getTotalRevenue)
app.get('/get-monthlyRevenue/:doctorId',getMontlyRevenue)
app.get('/get-yearlyRevenue/:doctorId',getYearlyRevenue)
app.get('/get-symptomTypes/:doctorId',getSymptomType)

app.get('/get-allpatients',getAllPatientCount)
app.get('/get-fullRevenue',getFullRevenue)
app.get('/get-fullmonthlyRevenue',getFullMontlyRevenue)
app.get('/get-fullyearRevenue',getFullYearRevenue)
app.get('/get-fullSymptomTypes',fullSymptomTypes)

app.post('/chat', createChat)
app.get('/chat/:userId', userChats)
app.get('/chat/find/:firstId/:secondId', findChat)

app.post('/message', addMessage)
app.get('/message/:chatId', getMessage)

app.get('/all-blogs',getAllBlogs)
app.post('/add-blogs',addBlog)
app.get('/get-doctor-blogs/:doctorId', getDoctorBlogs)

export default app