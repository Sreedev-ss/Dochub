import { Ichat, ChatModel, ChatDocument } from '../models/chat'

class ChatRepository {
    async findById(id: string): Promise<ChatDocument | null> {
        return ChatModel.findById(id).exec()
    }

    async create(chat: any): Promise<ChatDocument> {        
        const data = await ChatModel.findOne({ members: { $all: [chat[0], chat[1]]}  })
        if (!data) {
            return ChatModel.create({ members: chat })
        }
    }

    async findUserChat(userId: string): Promise<ChatDocument | any | null> {
        return ChatModel.find({ members: { $in: [userId] } })
    }

    async findChat(firstId: string, secondId: string): Promise<ChatDocument | any | null> {
        return ChatModel.findOne({ members: { $all: [firstId, secondId] } })
    }
}

export { ChatRepository }