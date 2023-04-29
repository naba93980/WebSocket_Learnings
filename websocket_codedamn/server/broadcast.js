const { WebSocketServer, WebSocket } = require('ws')

const wss = new WebSocketServer({
    port: 8080,
}, () => {
    console.log("web socket server opened at port 8080")
})

// const clients = [];

// wss.on('connection', (ws) => {
//     clients.push(ws)
//     ws.on('message', (data) => {
//         console.log(data);
//         clients.forEach(client => client.send(data.toString()))
//     })
// })

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        wss.clients.forEach(client => {
            if (client.readyState == WebSocket.OPEN) {
                client.send(data.toString())
            }
        })
    })
})
