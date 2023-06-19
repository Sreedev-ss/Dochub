import { Request, Response } from 'express';
import { DoctorApi } from '../service/doctorApi';
import { DoctorRepository } from '../repositories/doctor';
import { DoctorService } from '../service/doctorService';
import { DoctorModel } from '../models/doctor';
import { DepartmentModel } from '../models/department';

const doctorAPI = new DoctorApi()
const docService = new DoctorService()
const doctorRepo = new DoctorRepository()

export const registerDoctor = async (req: Request, res: Response) => {
    try {

        const { name, DOB, sex, about, approved, email, password, role, mobile, specialization, address, photoURL, fees, worktime } = req.body.doctor
        const doctor = await doctorRepo.findByEmail(email)
        if (!doctor) {
            const response = await doctorAPI.registerDoctor(email, password, name, role)
            if (response) {
                const Id = response.data._id
                const addDoctor = await docService.addDoctor(Id, email, mobile, specialization, address, photoURL, name, DOB, sex, about, fees, worktime, approved)
                res.json(addDoctor)
            } else {
                throw 'Error adding doctor'
            }
        } else {
            throw 'Doctor already exist. Please Login'
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const getAllDoctor = async (req: Request, res: Response) => {
    try {
        const doctor = await DoctorModel.find({ approved: true })
        res.json(doctor)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getDoctor = async (req: Request, res: Response) => {
    try {
        const email = req.params.email
        const doctor = await doctorRepo.findByEmail(email)
        res.json(doctor)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const getDoctorById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const doctor = await doctorRepo.findById(id)
        console.log(doctor);

        res.json(doctor)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getDepartment = async (req: Request, res: Response) => {
    try {
        const department = await DepartmentModel.find({})
        res.json(department)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const addDepartment = async (req: Request, res: Response) => {
    try {
        const { department } = req.body
        const response = await DepartmentModel.create({ specialization: department })
        res.json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getDoctorRequest = async (req: Request, res: Response) => {
    try {
        const response = await doctorRepo.findDocRequest()
        res.json(response)
    } catch (error) {
        res.status(500).json({ error: 'Cannot find requested doctor' })
    }
}

export const approveDoctorRealtimeRequest = async (id: string, field: any, value: any) => {
    try {
        const response = await doctorRepo.update(id, field, value)
        return response
    } catch (error) {
        return error.message
    }
}

export const searchDoctor = async (req: Request, res: Response) => {
    const { query } = req.query;
    try {
        const results = await DoctorModel.find({
            name: { $regex: new RegExp(`^${query as string}`, 'i') }, // Case-insensitive search
        });
        console.log(results);
        
        res.json(results);
    } catch (error) {
        console.log('Error occurred during search:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}




