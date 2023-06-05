import axios from 'axios'

// const appointmentUrl = "http://localhost:8002/appointment"

const URL = "http://localhost:3000"

// export const appointmentServer = axios.create({
//         baseURL: `${appointmentUrl}`
// })

export const Server = axios.create({
        baseURL: URL
})

export const makeApiCall = async (endpoint: string, method: string, data?: any) => {
        try {
          const response = await axios({
            method,
            url: `${URL}${endpoint}`,
            data,
          });
          return response;
        } catch (error:any) {
          throw error.response.data;
        }
      };
