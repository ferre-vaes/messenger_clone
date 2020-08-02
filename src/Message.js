import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './Message.css';

export default function Message({username, message}) {
  const isUser = message.username === username;

  console.log(message);

  return(
    <div className={`message ${isUser && 'message__user'}`}>
      <Card className={isUser ? 'message__userCard' : 'message__guestCard'}>
        <CardContent>
          <Typography color="textSecondary">
            {
              isUser ? '' : `${message.username}:`
            }
          </Typography>
          <Typography variant="h5" component="h2">
            {
              message.message
            }
          </Typography>
        </CardContent>
      </Card>
    </div>
    
  )
}