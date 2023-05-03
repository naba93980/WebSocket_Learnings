const path = require('path')
const http = require('http')
const express = require("express")
const { Server } = require('socket.io')
const { log } = require('console')
const app = express()
const PORT = 5000 || process.env.PORT

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
    socket.on('message', ({ message, from }) => {
        console.log(message, from);
        ioServer.emit('message',{message, from})
    })
})


httpServer.listen(PORT, () => console.log(`Server started at port ${PORT}`))