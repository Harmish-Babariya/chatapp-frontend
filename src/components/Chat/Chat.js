import React, { useState, useEffect} from 'react';

import './Chat.css';
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://chatapp-backend-a9pxkvni5-harmish-babariya.vercel.app/";

  

  useEffect(() =>{
    const {name, room} = queryString.parse(window.location.search);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit('join', {name, room});

    return () => {
      socket.emit('disconnect');

      socket.off();
    }

  }, [ENDPOINT, window.location.search]);

  useEffect(() => {
    socket.on('message' , (message) => {
      setMessages([...messages, message]);
    });

    
  }, [messages]);

 


  const sendMessage = (event) => {
    
    event.preventDefault();
    
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }


  return (
    <div className='outerContainer'>
      <div className='container'>

        <InfoBar room={room} />
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  )
}

export default Chat;