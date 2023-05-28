import express from 'express'
import { login, signup } from '../../controller/authController'
const app = express.Router()

app.post("/signup",signup)
app.post("/login",login)

export default app