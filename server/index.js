import express from "express";
import cors from "cors"
import http from "http"
import { Server }from "socket.io"

const app = express()
    

app.use(cors())
app.use(express.json())

const server = http.createServer(app)

const io = new Server(server , {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
})

io.on("connection",(socket)=>{
    console.log(socket.id)


    socket.on("join_room",(data)=>{
        socket.join(data)
    })

    socket.on("send_message",()=>{
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnected", ()=>{
        console.log("User Disconnected")
    })
})



app.listen(process.env.PORT , ()=>{
    console.log(`Server started ${process.env.PORT}`)
})