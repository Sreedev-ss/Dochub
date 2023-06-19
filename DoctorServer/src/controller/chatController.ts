import { ChatRepository } from "../repositories/chat";
import { Request, Response } from "express";

const chatRepo = new ChatRepository()


export const createChat = async (req: Request, res: Response) => {
    try {
        const { senderId, recieverId } = req.body
        
        const members: any = [senderId, recieverId]
        const newChat = await chatRepo.create(members)
        res.json(newChat)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const userChats = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const chat = await chatRepo.findUserChat(userId)
        res.json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const findChat = async (req: Request, res: Response) => {
    try {
        const { firstId, secondId } = req.params
        const chat = await chatRepo.findChat(firstId, secondId)
        res.json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}

