import React from 'react'

import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';
import { MessageLeft, MessageRight } from './Message';
import { TextInput } from './TextInput';
import { useAppSelector } from '../../store/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: "flex",
      width: '100%',
      flexDirection: "column",
      position: "relative",
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
    },
    container: {
      width: "100%",
      height: "100%",
    },
    messagesBody: {
      margin: 10,
      width: '100%',
    }
  })
);

const Chat = () => {
  const classes = useStyles();
  const messages = useAppSelector((state) => state.roomInfo.messages);

  return (
    <div className={classes.container}>
      <Paper className={classes.paper} elevation={0}>
        <Paper id="style-1" className={classes.messagesBody} elevation={0}>
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
        <TextInput />
      </Paper>
    </div>
  );
}

export default Chat