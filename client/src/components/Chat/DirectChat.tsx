import { Box } from '@mui/material';
import React from 'react'
import { useAppSelector } from '../../store/hooks'
import MessagesWrapper from './MessagesWrapper';
import { TextInput } from './TextInput';

const DirectChat = () => {
  const { activeConversation, directChatHistory } = useAppSelector((s) => s.roomInfo);

  return (
    <Box>
      {activeConversation?.identity ? activeConversation?.identity.name : ''}
      <MessagesWrapper messages={directChatHistory} />
      <TextInput />
      {!activeConversation && <Box>Not choosen</Box>}
    </Box>
  )
}

export default DirectChat