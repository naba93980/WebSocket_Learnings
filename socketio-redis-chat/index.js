const path = require('path')
const http = require('http')
const express = require("express")
const { Server } = require('socket.io')
const app = express()
const redis = require('redis')
const PORT = 5000 || process.env.PORT
const redisClient = redis.createClient(6379, '127.0.0.1')
try {
    redisClient.connect()
} catch (error) {
    console.log(error);
}

app.set("view engine", "ejs")
app.get("/chat", (req, res) => {
    const username = req.query.username
    console.log(username);
    ioServer.emit('joined', { username })
    res.render("chat", { username })
})
app.get('/', (req, res) => {
    res.render("index")
})

const httpServer = http.createServer(app)
const ioServer = new Server(httpServer)

ioServer.on('connection', socket => {
    sendMessage(socket)
    socket.on('message', ({ from, message }) => {
        console.log(from, message);
        addMessageToRedis(from, message)
        ioServer.emit('message', { from, message })
    })
})

async function addMessageToRedis(from, message) {
    try {
        await redisClient.hSet('messages', from, message)
    } catch (error) {
        console.log(error);
    }
}

async function sendMessage(socket) {
    const data = await redisClient.hGetAll('messages')
    for (const from in data) {
        if (Object.hasOwnProperty.call(data, from)) {
            const message = data[from];
            socket.emit('message', { from, message })
        }
    }
    console.log(data);
}

httpServer.listen(PORT, () => console.log(`Server started at port ${PORT}`))