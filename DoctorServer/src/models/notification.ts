import { Schema, Document } from 'mongoose';
import db from '../config/mongodb';


interface Notification {
    approveDoctorCount: number
}

interface NotificationDocument extends Notification, Document { }

const NotificationSchema = new Schema<NotificationDocument>({
    approveDoctorCount: {
        type: Number,
        default: 0
    }
})


const NotificationModel = db.model<NotificationDocument>('Notification', NotificationSchema)

export { Notification, NotificationDocument, NotificationModel }