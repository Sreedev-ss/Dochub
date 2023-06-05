import express from 'express'
import { getPatientById, login, signup } from '../../controller/authController'
const app = express.Router()

app.post("/signup",signup)
app.post("/login",login)
app.get("/patientData/:id", getPatientById)

export default app