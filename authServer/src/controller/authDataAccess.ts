import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { PatientRepository } from '../repositories/patient';
import { DoctorRepository } from '../repositories/doctor';
import { httpStatus } from '../constants/httpStatus';

const httpMsg = httpStatus()
const doctorRepo = new DoctorRepository()
const patientRepo = new PatientRepository()

const authDataAccess = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Authentication token not provided' });
    }
    try {
        const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (decoded.role == 'patient') {
            const { id, email } = await patientRepo.findByEmail(decoded.email)
            if (!email) return res.status(401).json(httpMsg[401])
            res.json({ id, email })
        } else {
            const { id, email } = await doctorRepo.findByEmail(decoded.email)
            if (!email) return res.status(401).json(httpMsg[401])
            res.json({ id, email })
        }
    } catch (err) {
        return res.status(401).json({ message: 'Invalid authentication token' });
    }

}

export default authDataAccess