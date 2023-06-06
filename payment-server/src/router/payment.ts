import express from 'express'
import { payment, webhook } from '../controller/stripeController'
const app = express.Router()

app.post('/stripe',payment)
app.post('/webhook',webhook)

export default app