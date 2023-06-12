import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { serverConfig } from './serverConfig'
import { httpStatus } from './constants/httpStatus'
import dotEnv from 'dotenv'
import doctorApi from './routes/doctor'
import bodyParser from 'body-parser'
import http from 'http';
import { Server } from 'socket.io';
import socketConnection from './realtime-socket/socket'

const app = express();
const serverRealtime = http.createServer(app);

dotEnv.config()

socketConnection(serverRealtime)

const server = serverConfig()
const httpMsg = httpStatus()

app.use(cors())
app.use(cookieParser());
app.use(bodyParser.json());
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(`${server.baseUrl}/doctor`, doctorApi)


serverRealtime.listen(8080, () => {
    console.log(`Realtime server running on port 8080`)
})

app.use((req, res) => {
    res.send({ code: 404, error: httpMsg[404] })
})
app.listen(server.port, () => {
    console.log(`Admin server running on port ${server.port}`)
})