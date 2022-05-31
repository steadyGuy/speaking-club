import React, { useState } from 'react'
import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { sendMsgUsingDataChannel } from '../../utils/webRTCHanlder';

export const TextInput = () => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      sendMessage();
    }
  }

  const sendMessage = () => {
    if (message.length > 0) {
      setMessage('');
      sendMsgUsingDataChannel(message);
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <TextField
          value={message}
          margin="dense"
          onChange={handleMessageChange}
          onKeyDown={handleKeyPressed}
          label="Print your message."
        />
        <IconButton size="large" sx={{ ml: 2 }} color="primary" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </>
  )
}



