import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { DoctorRepository } from '../repositories/doctor';

const authService = new AuthService();
const doctorRepo = new DoctorRepository();

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
    console.log('hey');
    
    try {
        const { email, password, IdToken } = req.body;
        const user = await authService.login(email, password, IdToken);
        res.json(user);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const getDoctor = async (req: Request, res: Response) => {
    try {
        const email:any = req.query?.email
        const data = await doctorRepo.findByEmail(email)
        res.json(data.id)
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export { signup, login, getDoctor };
