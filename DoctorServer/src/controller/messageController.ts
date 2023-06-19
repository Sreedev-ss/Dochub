import { Request, Response } from "express";
import { MessageRepository } from "../repositories/message";

const messageRepo = new MessageRepository()

export const addMessage = async (req: Request, res: Response) => {
    try {        
        const { chatId, senderId, text } = req.body.message
        const message = {
            chatId: chatId,
            senderId: senderId,
            text: text
        }
        const response = await messageRepo.create(message)
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const getMessage = async (req: Request, res: Response) => {
    try {
        const { chatId } = req.params
        const response = await messageRepo.findMessage(chatId)
        res.json(response)
    } catch (error) {
        res.status(500).json(error)
    }
}