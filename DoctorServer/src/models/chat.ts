import { Schema, Document } from 'mongoose';
import db from '../config/mongodb';

interface Ichat {
    members: any
}

interface ChatDocument extends Ichat, Document { }

const ChatSchema = new Schema<ChatDocument>({
    members: {
        type: Array
    },
}, {
    timestamps: true
}
)


const ChatModel = db.model<ChatDocument>('Chat', ChatSchema)

export { Ichat, ChatDocument, ChatModel }