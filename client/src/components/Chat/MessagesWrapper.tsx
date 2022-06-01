import { Paper } from '@mui/material';
import React, { FC } from 'react'
import { IMessage } from '../../types'
import { MessageLeft, MessageRight } from './Message';

type MessagesWrapperProps = {
  messages: IMessage[] | Record<string, IMessage[]>;
  receiverId?: string;
  senderId?: string;
}

const MessagesWrapper: FC<MessagesWrapperProps> = ({ messages, receiverId, senderId }) => {
  let msgs: IMessage[] = [];

  if (!Array.isArray(messages) && receiverId && senderId) {
    msgs = messages[`${receiverId}_${senderId}`] || messages[`${senderId}_${receiverId}`] || []
  } else if (Array.isArray(messages)) {
    msgs = messages as IMessage[];
  }

  return (
    <Paper sx={{ m: 2, width: '100%' }} elevation={0}>
      {msgs?.map((itm, i) => (
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