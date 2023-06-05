import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import { serverConfig } from './serverConfig'
import gatewayServer from './router/gatewayServer'
import bodyParser from 'body-parser';


const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = serverConfig()

app.use(cors())
app.use(logger('dev'))
app.use('/',gatewayServer)

app.listen(server.port, () => {
    console.log(`Auth server running on port ${server.port}`)
})