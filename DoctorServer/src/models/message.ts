import mongoose, { Schema, Document } from 'mongoose';
import db from '../config/mongodb';

interface IMessage {
    chatId: string;
    senderId: string;
    text: string;
}

interface MessageDocument extends IMessage, Document { }

const MessageSchema = new Schema<MessageDocument>({
    chatId: {
        type: String,
        required:true
    },
    senderId: {
        type: String,
        required:true
    },
    text: {
        type: String,
        required:true
    }
}, {
    timestamps: true
})

const MessageModel = db.model('Message', MessageSchema)

export { MessageModel, IMessage, MessageDocument }