import axios from 'axios'

const authUrl = "http://localhost:8001/auth"
const docUrl = "http://localhost:8000/admin/doctor"

export const authServer = axios.create({
        baseURL : `${authUrl}/doctor`
})
export const docServer = axios.create({
    baseURL:`${docUrl}`
})

