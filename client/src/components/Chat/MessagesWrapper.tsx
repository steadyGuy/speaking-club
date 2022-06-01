import { Paper } from '@mui/material';
import React, { FC } from 'react'
import { IMessage } from '../../types'
import { MessageLeft, MessageRight } from './Message';

type MessagesWrapperProps = {
  messages: IMessage[];
}

const MessagesWrapper: FC<MessagesWrapperProps> = ({ messages }) => {
  return (
    <Paper sx={{ m: 2, width: '100%' }} elevation={0}>
      {messages.map((itm, i) => (
        !itm.isAuthor ? <MessageLeft
          key={i}
          message={itm.message}
          timestamp={itm.time}
          displayName={itm.author}
          avatarDisp={true}
        /> : <MessageRight
          key={i}
          message={itm.message}
          timestamp={itm.time}
          displayName={itm.author}
          avatarDisp={true}
        />
      ))}
    </Paper>
  )
}

export default MessagesWrapper