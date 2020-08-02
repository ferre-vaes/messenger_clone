/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, InputLabel, Input, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import logo from './messenger_logo.png'

function App() {
  const [ input, setInput ] = useState('');
  const [ messages, setMessages ] = useState([]);
  const [ username, setUsername] = useState('');


  useEffect(() => {
    setUsername(prompt('What is your name?'));
  }, []);

  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    })
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if(input !== '') {
      db.collection('messages').add({username: username, message: input, timestamp: firebase.firestore.FieldValue.serverTimestamp()})
      setInput('');
    }
  };

  return (
    <div className="app">
      <img className="app__logo" src={logo} alt="Messenger Inc."/>
      <h1>Hello! This is a Messenger clone! 🙌</h1>
      
      <form className="app__form">
        <FormControl className="app__formControl">
          <InputLabel>Enter a message...</InputLabel>
          <Input className="app__input" id="standard-basic" label="Message" value={input} onChange={event => setInput(event.target.value)}/>
          <IconButton color="primary" type="submit" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      
      <div className="app__messages">
        {
          messages.map(message => {
            return <Message username={username} message={message}/>
          })
        }
      </div>
      
    </div>
  );
}

export default App;
