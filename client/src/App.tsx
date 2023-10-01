import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { io } from "socket.io-client";
import socketService from './services/socketService';
import JoinRoom from './components/joinRoom';

function App() {
  const connectSocket = async () => {
    const socket = await socketService.connect("http://localhost:9000").catch((err) => {
      console.log("Error: ", err);
    })
  }

  useEffect(() => {
    connectSocket();
  }, [])

  return (
    <div className="App">
      <JoinRoom />
    </div>
  );
}

export default App;
