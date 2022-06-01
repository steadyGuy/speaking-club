import React from 'react'

import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from '@mui/styles';
import { Box, Paper } from '@mui/material';
import { TextInput } from './TextInput';
import { useAppSelector } from '../../store/hooks';
import MessagesWrapper from './MessagesWrapper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      maxHeight: '97vh',
      overflowY: 'scroll',
      overflowX: 'hidden',
      '&::-webkit-scrollbar': {
        width: 1,
      }
    },
  })
);

const Chat = () => {
  const classes = useStyles();
  const messages = useAppSelector((state) => state.roomInfo.messages);

  return (
    <Box sx={{ height: '100%' }}>
      <Paper className={classes.paper} elevation={0}>
        <MessagesWrapper messages={messages} />
        <TextInput />
      </Paper>
    </Box>
  );
}

export default Chat