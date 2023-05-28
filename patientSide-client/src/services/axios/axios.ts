import axios from 'axios'

const authUrl = "http://localhost:8001/auth"
const appointmentUrl = "http://localhost:8002/appointment"

export const authServer = axios.create({
        baseURL : `${authUrl}/patient`
})

export const appointmentServer = axios.create({
        baseURL: `${appointmentUrl}`
})