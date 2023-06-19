const io = require("socket.io")(8080, {
    cors: {

    },
  });
  
  let activeUsers = [];
  console.log(activeUsers,'active user')

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
        console.log("Sending from socket to :", recieverId)
        console.log("Data: ", data)
        if (user) {
          io.to(user.socketId).emit("recieve-message", data);
        }
      });
})
