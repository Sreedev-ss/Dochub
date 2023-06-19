import { IMessage, MessageDocument, MessageModel } from '../models/message'

class MessageRepository {
    async findById(id: string): Promise<MessageDocument | null> {
        return MessageModel.findById(id).exec()
    }

    async create(message: IMessage): Promise<MessageDocument | null> {

        return MessageModel.create(message)
    }

    async findMessage(chatId: string): Promise<MessageDocument | any | null> {
        console.log(chatId);
        
        return MessageModel.find({ chatId })
    }
}

export { MessageRepository }