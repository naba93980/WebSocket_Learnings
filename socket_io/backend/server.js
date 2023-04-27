const app = require('express')();
const { createServer } = require("http");
const { Server } = require('socket.io')


// creating a http server then using it to create the socket.io server
const httpServer = createServer(app);
const ioServer = new Server(httpServer, {
    cors: {
        origin: "*"
    },
    // transports: ["websocket"]
})

// once a client is connected
ioServer.on("connection", (socket) => {
    console.log("what is socket: ", socket);
    console.log("Socket is active to be connected");

    // once a 'chat' event is emitted by the socket object which represents connection to the client
    socket.on("chat",(payload)=>{
        console.log("payload: ", payload);
        ioServer.emit("chat",payload) // kinda broadcasting the payload
    })
})

httpServer.listen(3000, () => console.log("server started at 3000"));

