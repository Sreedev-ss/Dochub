import axios from 'axios'


class DoctorApi {
    async registerDoctor(email:string, password:string, name:string, role:string ){
       const response = await axios.post(`http://auth-server:8001/auth/doctor/signup`,{email,password,name,role})
       return response
    }

    async getDoctorDetails(email:string){
        const response = await axios.get(`'http://auth-server:8001/auth/doctor/getDoctor?${email}`)
        return response
    }
}

export {DoctorApi}