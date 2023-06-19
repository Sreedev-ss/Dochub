import { Server, Socket } from 'socket.io';

const socketConnection = async(server:any) => {
    const io = new Server(server, {
        cors: {
    
        }
    });

    let activeUsers = [];

        // const doc:Notification = await NotificationModel.findOne({})
        // if (doc) {
        //     count = doc.approveDoctorCount;
        //     io.emit('count', count);
        //   }

        // io.on('connection',(socket: Socket) => {
        //     socket.emit('count', count);    
        //     socket.on('approveDoctorRequest', () => {
        //         handleApproveDoctorRequest();
        //     });
        // });

        // async function handleApproveDoctorRequest() {
        //     const updatedCount = await notificationRepo.findOneandUpdate()                    
        //     count = updatedCount.approveDoctorCount;
        //     io.emit('count', count);
        // }

        io.on('connection',(socket)=>{
            socket.on('new-user-add',(newUserId)=>{
                if(!activeUsers.some((user)=>user.newUserId === newUserId)){
                    activeUsers.push({userId:newUserId,socketId:socket.id})
                    console.log('new user connected',activeUsers);
                    
                }
                
                io.emit('get-users',activeUsers)
            })
            socket.on("disconnect", () => {
                // remove user from active users
                activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
                console.log("User Disconnected", activeUsers);
                // send all active users to all users
                io.emit("get-users", activeUsers);
              });
            
              // send message to a specific user
              socket.on("send-message", (data) => {
                const { recieverId,senderId } = data;
                const user = activeUsers.find((user) => user.userId === recieverId);
                console.log(activeUsers,'if user');
                console.log("Sending from socket to :", recieverId)
                console.log("Data: ", data)
                if (user) {
                    console.log('hi');
                    
                  io.to(user.socketId).emit("recieve-message", data);
                }
              });
        })



}

export default socketConnection