import React, { useEffect } from 'react';
import './App.css'
import io from 'socket.io-client'
import Messenger from './components/Messenger';
const socket = io.connect('http://localhost:5000')
const App = () => {

  // const messageSender = () => {
  //   socket.emit("send_message", {
  //     message: "Hello Dear"
  //   })
  // }
  useEffect(() => {
    socket.on("recive_message", (data) => {
      console.log(data)
    })
  }, [])
  return (
    <div >
      <Messenger />
    </div>
  )
}

export default App