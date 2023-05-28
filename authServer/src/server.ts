import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import patientRoute from './router/patient/patientRoute'
import doctorRoute from './router/doctor/doctorRoute'
import cors from 'cors'
import { serverConfig } from './serverConfig'
import { httpStatus } from './constants/httpStatus'
import dotEnv from 'dotenv'
import getAuthData from './controller/authDataAccess'
dotEnv.config()

const app = express()
const httpMsg = httpStatus()
const server = serverConfig()

app.use(cors())
app.use(cookieParser());
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(`${server.baseUrl}/patient`, patientRoute)
app.use(`${server.baseUrl}/doctor`, doctorRoute)
app.get(`${server.baseUrl}/checkAuth`,getAuthData)

app.use((req, res) => {
    res.send({ code: 404, error: httpMsg[404] })
})
app.listen(server.port, () => {
    console.log(`Auth server running on port ${server.port}`)
})