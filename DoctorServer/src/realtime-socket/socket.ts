import { Server, Socket } from 'socket.io';
import { Notification, NotificationModel } from '../models/notification';
import { NotificationRepository } from '../repositories/notification';
const notificationRepo = new NotificationRepository()
let count = 0;

const socketConnection = async(server:any) => {
    const io = new Server(server, {
        cors: {
    
        }
    });
    try { 
        const doc:Notification = await NotificationModel.findOne({})
        if (doc) {
            count = doc.approveDoctorCount;
            io.emit('count', count);
          }

        io.on('connection',(socket: Socket) => {
            socket.emit('count', count);    
            socket.on('approveDoctorRequest', () => {
                handleApproveDoctorRequest();
            });
        });

        async function handleApproveDoctorRequest() {
            const updatedCount = await notificationRepo.findOneandUpdate()                    
            count = updatedCount.approveDoctorCount;
            io.emit('count', count);
        }


    } catch (error) {
        console.log(error);
           
    }
}

export default socketConnection