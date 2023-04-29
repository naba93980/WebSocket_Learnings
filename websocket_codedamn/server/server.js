const { WebSocketServer } = require('ws');
const http = require('http')
const express = require('express');
const app = express();
const path = require('path')

app.use('/', express.static(path.resolve(__dirname, '../client')));

const httpServer = http.createServer(app);

const wss = new WebSocketServer({
    server: httpServer
})

httpServer.listen(8080,()=>{
    console.log("listening at 8080");
})

// app.listen can also be used which would return http.Server so no need of const httpServer = http.createServer(app);

