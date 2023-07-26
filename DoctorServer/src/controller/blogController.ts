import { Request, Response } from 'express';
import { BlogModel } from '../models/blog';

export const addBlog = async (req: Request, res: Response) => {
    try {
        const { data } = req.body
        const response = await BlogModel.create(data)
        res.json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const allBlogs = await BlogModel.find()
        res.json(allBlogs)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getDoctorBlogs = async (req: Request, res: Response) => {
    try {
        const { doctorId } = req.params
        const doctorBlogs = await BlogModel.find({ doctorId: doctorId })
        res.json(doctorBlogs)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}