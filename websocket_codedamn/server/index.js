const { WebSocketServer, WebSocket } = require('ws')

const wss = new WebSocketServer({
    port: 8080,
}, () => {
    console.log("web socket server opened at port 8080")
})

wss.on('connection',(ws)=>{
    console.log(WebSocket );
})






// if no path is mentioned then the client will connect to this server at any path eg. -> ws://127.0.0.1:8080/abc/efg


// const wss = new WebSocketServer({
//     port: 8080,
// }, function() {
    // console.log(this)   this here is wss object as if the anonymous function is passed as a callback to a method of an object, "this" will refer to the object itself, because the method will set the execution context to the object. On the other hand, if the anonymous function is passed as a callback to a global function or as a standalone function, "this" will refer to the global object (in non-strict mode) or undefined (in strict mode).
// })  

