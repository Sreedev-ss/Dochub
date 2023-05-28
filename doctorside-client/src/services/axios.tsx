import axios from 'axios'

const authUrl = "http://localhost:8001/auth"

export const authServer = axios.create({
        baseURL : `${authUrl}/doctor`
})

