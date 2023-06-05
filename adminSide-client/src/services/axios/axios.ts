import axios from 'axios'

const authUrl = "http://localhost:8001/auth"
// const appointmentUrl = "http://localhost:8002/appointment"
const docUrl = "http://localhost:8000/admin/doctor"

export const authServer = axios.create({
        baseURL : `${authUrl}/admin`
})

// export const appointmentServer = axios.create({
//         baseURL: `${appointmentUrl}`
// })

export const docServer = axios.create({
        baseURL:`${docUrl}`
    })