import React, { Component, useState, useEffect } from 'react';
import queryString from 'query-string';
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';


import io from 'socket.io-client';
import './Chat.css';


let socket;

const Chat=({location}) =>{

       const [name, setName] = useState('');
       const [room, setRoom] = useState('');
       const [message, setMessage] = useState('');
       const [messages, setMessages] = useState([]);
       const ENDPOINT='https://plataforma-erasmus.herokuapp.com/'

    useEffect(()=>{
        const {name, room}=queryString.parse(location.search);
        socket=io(ENDPOINT);

        setName(name);
        setRoom(room);
      
       socket.emit('join', {name, room}, ()=>{
        
       }); 
     
       return () =>{
           socket.emit('disco');
           socket.off();
       }
     
    }, [ ENDPOINT, location.search]);
 


    useEffect(()=>{
     
        socket.on('message', (message)=>{
            setMessages([...messages, message]);
        });
    },[messages]);

    // funcion para enviar mensajes

    const sendMessage =(event) =>{
    
        event.preventDefault();

        if(message){
            socket.emit('sendMessage', message, ()=> setMessage(''));
        }
    }

  
    
        return (
            <div className="outerContainer">
               <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
               </div>
              

            </div>

        );
   
}

export default Chat;