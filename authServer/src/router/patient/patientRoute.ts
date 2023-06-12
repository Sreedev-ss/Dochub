import express from 'express'
import { getPatientById, login, signup, sendEmail,verifyEmail } from '../../controller/authController'
const app = express.Router()

app.post("/signup",signup)
app.post("/login",login)
app.get("/patientData/:id", getPatientById)
app.post("/send-email-code",sendEmail)
app.post("/verify-email",verifyEmail)

export default app