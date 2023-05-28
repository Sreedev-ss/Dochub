import express from 'express'
import { login } from '../../controller/authController'
const app = express.Router()

app.post("/login",login)

export default app