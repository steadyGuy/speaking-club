import { Box, Typography, useTheme } from '@mui/material';
import React from 'react'
import { useAppSelector } from '../../store/hooks'
import MessagesWrapper from './MessagesWrapper';
import { TextInput } from './TextInput';

const DirectChat = () => {
  const { activeConversation, directChatHistory, identity } = useAppSelector((s) => s.roomInfo);
  const theme = useTheme();

  return (
    <Box sx={{
      border: 'solid 1px #eaeaea',
      borderRadius: 0.5,
      minHeight: '350px',
      maxHeight: '350px',
      overflowY: 'scroll',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      '&::-webkit-scrollbar': {
        width: 1,
      }
    }}
    >
      <Box sx={{ backgroundColor: theme.palette.primary.main, color: 'white', textAlign: 'center', p: 1.5 }}>
        {activeConversation?.identity ? activeConversation?.identity.name : ''}
      </Box>
      <Box sx={{
        p: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      >
        {!activeConversation && <Typography variant='subtitle2' sx={{ textAlign: 'center', mt: 22 }}>Conversation Not Chosen</Typography>}
        <Box sx={{ maxHeight: 120, }}>
          <MessagesWrapper messages={directChatHistory}
            receiverId={activeConversation?.identity.id}
            senderId={identity.id}
          />
        </Box>
        <Box sx={{ mt: 'auto' }}>
          <TextInput isDirect={true} />
        </Box>
      </Box>
    </Box>
  )
}

export default DirectChat