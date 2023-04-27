import './App.css';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';

const socket = io('http://192.168.1.5:3000', {
  // transports: ["websocket"] 
})
const userName = nanoid(5);

function App() {

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("chat", (payload) => {
      console.log(payload)
      setChat(chat=>[...chat, payload])
    })
  },[])

  const sendChat = (e) => {
    e.preventDefault()
    socket.emit("chat", { message, userName })
    setMessage('')
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Chatty app</h2>
        {chat.map((payload, index) => {
          return (
            <p key={index}>{payload.message} : {payload.userName}</p>
          )
        })}
        <form onSubmit={sendChat}>
          <input type="text" name='chat' placeholder='send text' value={message} onChange={(e) => setMessage(e.target.value)} />
          <button type='submit'>Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
