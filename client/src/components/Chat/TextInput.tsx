import React, { FC, useState } from 'react'
import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { sendMsgUsingDataChannel } from '../../utils/webRTCHanlder';
import { sendDirectMessage } from '../../utils/wss';
import { useAppSelector } from '../../store/hooks';

export type TextInputProps = {
  isDirect?: boolean;
}

export const TextInput: FC<TextInputProps> = ({ isDirect }) => {
  const [message, setMessage] = useState("");
  const activeConversation = useAppSelector((s) => s.roomInfo.activeConversation)
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
      if (isDirect) {
        sendDirectMessage(message)
      } else {
        sendMsgUsingDataChannel(message)
      }
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
          disabled={!activeConversation && isDirect}
          label="Print your message."
        />
        <IconButton size="large" sx={{ ml: 2 }} color="primary" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </>
  )
}



