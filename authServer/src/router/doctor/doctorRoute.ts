import express from 'express'
import { login, signup, getDoctor } from '../../controller/authController'
const app = express.Router()

app.post("/signup",signup)
app.post("/login",login)
app.get("/getDoctor",getDoctor)

export default app