const url = `ws://localhost:8080`
const client = new WebSocket(url)                                       // new websocket client connection
const message = document.getElementById('messages')
const input = document.getElementById('message')
const button = document.getElementById('send')

button.disabled = true
button.addEventListener('click', sendMessage)

// client sends message to server once ws connection is open
client.addEventListener('open', () => {
    client.send('Hello from client')
    button.disabled = false
})

// client listens to message from server and then renders it on screen by calling generateMessage()
client.addEventListener('message', (e) => {
    const { data } = e
    generateMessage(data)
})

function generateMessage(data) {
    const newMessage = document.createElement('p')
    newMessage.innerText = data
    message.appendChild(newMessage)
}

function sendMessage() {
    const text = input.value
    client.send(text)
}