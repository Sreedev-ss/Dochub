import { Notification, NotificationDocument, NotificationModel } from '../models/notification'

class NotificationRepository {
    async findOneandUpdate(): Promise<NotificationDocument | null> {
        return NotificationModel.findOneAndUpdate({}, { $inc: { approveDoctorCount: 1 } })
    }
}

export { NotificationRepository }
