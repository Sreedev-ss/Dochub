import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password, IdToken } = req.body;
        const user = await authService.register(name, email, password, IdToken);
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
        console.log(error);

        res.status(401).json({ error: error.message });
    }
};

export { signup, login };
