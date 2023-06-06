import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import dotEnv from 'dotenv'
import bodyParser from 'body-parser'
import { serverConfig } from './serverConfig'
import paymentRoute from './router/payment'
dotEnv.config()

const app = express()
const server = serverConfig()

app.use(cors())
app.use(bodyParser.json());
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/payment',paymentRoute)

app.use((req, res) => {
    res.send({ code: 404, error: 'Not found '})
})

setTimeout(() => {
    app.listen(server.port, () => {
        console.log(`Payment server running on port ${server.port}`)
    })
  }, 1000);