import express from 'express'
const app = express.Router()
import { registerDoctor,getAllDoctor, getDoctor, getDoctorById, addDepartment, getDepartment } from '../controller/doctorController'

app.post('/add-doctor',registerDoctor)
app.get('/all-doctor',getAllDoctor)
app.get('/get-doctor/:email',getDoctor)
app.get('/get-doctor-details/:id',getDoctorById)
app.post('/add-department', addDepartment)
app.get('/get-department', getDepartment)

export default app