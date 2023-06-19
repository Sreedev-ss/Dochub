import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Response, NextFunction } from 'express';
import RequestDefenition from '../definition';
dotenv.config()


export const authenticateToken = (req:RequestDefenition, res:Response, next:NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null){
        return res.sendStatus(401).json({ message: 'Authentication token not provided' });
    } 
        
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403).json({ message: 'Invalid authentication token' });
        }else{
            next()
        }
    })

}
