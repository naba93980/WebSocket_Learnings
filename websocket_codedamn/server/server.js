const { WebSocketServer } = require('ws');
const http = require('http')
const express = require('express');
const app = express();
const path = require('path');

app.use('/', express.static(path.resolve(__dirname, '../client')));

const httpServer = http.createServer(app);
httpServer.listen(8080, () => {
    console.log("listening at 8080");
})

// const wss = new WebSocketServer({
//     server: httpServer,
//     verifyClient: (info) => {
//         console.log(info);
//         return true
//     }
// })

// a websocket server no attached to any http server
const wss = new WebSocketServer({
    noServer: true
})

wss.on('connection', (ws, request) => {
    ws.send('hi from server')
})

// the http server runs the async function on upgrade event
httpServer.on('upgrade', async (request, socket, head) => {

    const body = request.body
    console.log(`logging ${body}`);

    try {
        // await verify(body)
        wss.handleUpgrade(request, socket, head, (ws, request) => {
            console.log("inside hndleupgrade");
            wss.emit('connection', ws, request)
        })
    } catch (e) {
        console.log(e);
        socket.end()
        return
    }
})


// app.listen can also be used which would return http.Server so no need of const httpServer = http.createServer(app);

