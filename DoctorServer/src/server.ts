import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { serverConfig } from './serverConfig'
import { httpStatus } from './constants/httpStatus'
import dotEnv from 'dotenv'
import doctorApi from './routes/doctor'
import bodyParser from 'body-parser'

const app = express();

dotEnv.config()

const server = serverConfig()
const httpMsg = httpStatus()

app.use(cors())
app.use(cookieParser());
app.use(bodyParser.json());
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(`${server.baseUrl}/doctor`, doctorApi)


app.use((req, res) => {
    res.send({ code: 404, error: httpMsg[404] })
})
app.listen(server.port, () => {
    console.log(`Doctor server running on port ${server.port}`)
})