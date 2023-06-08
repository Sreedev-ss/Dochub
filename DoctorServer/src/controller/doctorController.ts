import { Request, Response } from 'express';
import { DoctorApi } from '../service/doctorApi';
import { DoctorRepository } from '../repositories/doctor';
import { DoctorService } from '../service/doctorService';
import { DoctorModel } from '../models/doctor';
import { DepartmentModel } from '../models/department';

const doctorAPI = new DoctorApi()
const docService = new DoctorService()
const doctorRepo = new DoctorRepository()

const registerDoctor = async (req: Request, res: Response) => {
    try {
        
        const {name, DOB, sex, about, approved ,email, password, role, mobile, specialization, address, photoURL, fees, worktime } = req.body.doctor
        const doctor = await doctorRepo.findByEmail(email)
        if (!doctor) {
            const response = await doctorAPI.registerDoctor(email, password, name, role)
            if (response) {
                const Id = response.data._id
                const addDoctor = await docService.addDoctor(Id, email, mobile, specialization, address, photoURL, name, DOB, sex, about, fees, worktime,approved)
                res.json(addDoctor)
            } else {
                throw new Error('Error adding doctor')
            }
        } else {
            throw new Error('Doctor already exist')
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

const getAllDoctor = async (req: Request, res: Response) => {
    try {
        const doctor = await DoctorModel.find({approved:true})
        res.json(doctor)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getDoctor = async (req: Request, res: Response) => {
    try {
        const email = req.params.email
        const doctor = await doctorRepo.findByEmail(email)
        res.json(doctor)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getDoctorById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const doctor = await doctorRepo.findById(id)
        res.json(doctor)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getDepartment = async (req: Request, res: Response) => {
    try {
        const department = await DepartmentModel.find({})
        res.json(department)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addDepartment = async (req: Request, res: Response) => {
    try {
        const { department } = req.body
        const response = await DepartmentModel.create({ specialization: department })
        res.json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


export {
    registerDoctor,
    getAllDoctor,
    getDoctor,
    getDoctorById,
    addDepartment,
    getDepartment,
}
