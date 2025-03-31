import express, { Express} from "express";
import { createServer } from "http";
import { console } from "inspector";
import { Server } from "socket.io";

// express app instance
const app:Express = express()
// create a http server using express app
const server = createServer(app);
// create socket server using http server
const io = new Server(server,{
    cors:{
        origin:["http://localhost:5173"],
        methods:["GET","POST"]
    }
});

const userSocketMap : Map<string,string> = new Map(); // {userId : socketId}
const getSocketId = (userId:string)=>{
    return userSocketMap.get(userId);
}

io.on("connection",(socket)=>{
    console.log("user connected",socket.id);
    
    // extract userId from socket query
    const userId = socket.handshake.query.userId as string;

    userSocketMap.set(userId,socket.id);
    console.log("user connected",Array.from(userSocketMap.keys()));
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()))
    
    socket.on("disconnect",()=>{
        userSocketMap.delete(userId);
        console.log("user disconnected");
        socket.emit("getOnlineusers", Array.from(userSocketMap.keys()))
    })
})

export {app,io,server, getSocketId};