import { ObjectId } from "mongodb"
import { DoctorRepository } from "../repositories/doctor"

const doctorRepo = new DoctorRepository()

class DoctorService {
    async addDoctor(id: ObjectId, email: string, mobile: number, specialization: string, address: string, photoURL: string, name:string, DOB:string, sex:string, about:string, fees: string, worktime: string) {
        const doctorData: any = {
            email: email,
            DoctorId: id,
            mobile: mobile,
            name: name,
            DOB: DOB,
            gender: sex,
            about: about,
            address: address,
            specialization: specialization,
            fees: fees,
            photoURL: photoURL,
            worktime: worktime
        }

        return await doctorRepo.create(doctorData)


    }
}

export { DoctorService }