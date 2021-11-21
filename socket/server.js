const io=require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000/",
    },
});
let users=[];
const addUsers=(userId,socketId)=>{
    !users.some((user)=>user.userId===userId)&&
    users.push({userId,socketId});
};
const removeUser=(socketId)=>{
    users=users.filter((user)=>user.socketId!==socketId);
};
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
io.on("connection", (socket) => {
    //when ceonnect
    console.log("USER CONNECTED.");
  
    //take userId and socketId from user
socket.on("addUsers", (userId) => {
      addUsers(userId, socket.id);
      io.emit("getUsers", users);
});
  
    //send and get message
socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
});
  
 
socket.on("disconnect", () => {
      console.log("USER DISCONNECTED!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
});
  