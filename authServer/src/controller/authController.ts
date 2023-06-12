import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { DoctorRepository } from '../repositories/doctor';
import { PatientRepository } from '../repositories/patient';
import { PatientModel } from '../models/patient';
import { sendMail } from '../services/nodemailer';

const authService = new AuthService();
const doctorRepo = new DoctorRepository();
const patientRepo = new PatientRepository();

const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password, IdToken, role } = req.body;
        const user = await authService.register(name, email, password, IdToken, role);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { email, password, IdToken } = req.body;
        const user = await authService.login(email, password, IdToken);
        res.json(user);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const sendEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.body
        const patient = await patientRepo.findByEmail(email)
        const response = await sendMail(email,patient.verificationCode)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const verifyEmail = async (req: Request, res: Response) => {
    try {
        const {code,email} = req.body
        const patient = await patientRepo.findByEmail(email)
        if(code == patient.verificationCode){
            await PatientModel.updateOne({email:patient.email},{
                $set:{
                    isValid:true
                }
            })
            res.status(200).json(patient)
        }else{
        
            res.status(401).json('Email verification failed')
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getPatientById = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id
        const data = await patientRepo.findById(id)
        res.json(data)
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

const getDoctor = async (req: Request, res: Response) => {
    try {
        const email: any = req.query?.email
        const data = await doctorRepo.findByEmail(email)
        res.json(data.id)
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export { signup, login, getDoctor, getPatientById, sendEmail,verifyEmail };
