import { Box, Button, Checkbox, Container, FormControlLabel, Paper, TextField, Typography, useTheme } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import MainBg from '../components/MainBg'
import { setError } from '../store/action-creators/errorActions'
import { setIdentity, setIsConnectedOnlyWithAudio, setIsRoomHost, setRoomId } from '../store/action-creators/roomInfoActions'
import { ErrorActionTypes } from '../store/action-types/errorActionTypes'
import { RoomInfoActionTypes } from '../store/action-types/roomInfoActionTypes'
import { useAppDispatch, useAppSelector } from '../store/hooks'

const JoinRoomPage = () => {
  const search = useLocation().search;
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const roomState = useAppSelector((state) => state.roomInfo)
  const [roomInfo, setRoomInfo] = useState({
    name: '',
    roomId: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setRoomInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    dispatch(setIsConnectedOnlyWithAudio(checked))
  }

  const getRoomExists = async (roomId: string) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_HOST}/api/room-exists/${roomId}`
      );
      const json = await res.json();
      if (json) {
        dispatch({
          type: RoomInfoActionTypes.FETCH_ROOM_INFO_SUCCESS,
          payload: json,
        });
      }
      return json;
    } catch (err: any) {
      console.log("Error", err);
      dispatch({ type: ErrorActionTypes.SET_ERROR, payload: { message: err } });
    }
  }

  const joinRoom = async () => {
    const { roomExists, full } = await getRoomExists(roomInfo.roomId);
    if (roomExists) {
      if (full) {
        dispatch(setError("Meeting is full. Please, try again later"));
      } else {
        dispatch(setRoomId(roomInfo.roomId));
        navigate('/room', { replace: true });
      }
    } else {
      dispatch(setError("Meeting not found. Check your meeting id"));
    }
  }

  const createRoom = () => {
    navigate('/room', { replace: true });
  }

  const handleJoinRoom = () => {
    dispatch(setIdentity({ name: roomInfo.name, id: uuidv4() }));
    if (roomState.isRoomHost) {
      createRoom();
    } else {
      joinRoom();
    }
  }


  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get('host');
    if (isRoomHost && !roomState.isRoomHost) {
      dispatch(setIsRoomHost(Boolean(isRoomHost)));
    } else {
      dispatch(setIsRoomHost(Boolean(isRoomHost)));
    }
  }, [dispatch, roomState.isRoomHost, search]);

  return (
    <MainBg>
      <Container
        sx={{
          zIndex: theme.zIndex.appBar,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
        maxWidth="sm"
      >
        <Paper sx={{ width: '100%', py: 16, px: 5 }}>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', maxWidth: 340, margin: '0 auto' }}>
            <Typography variant="h2">{roomState.isRoomHost ? 'Host meeting' : 'Join meeting'}</Typography>
            {!roomState.isRoomHost && <TextField
              required
              id="meeting-id"
              label="Enter meeting ID"
              sx={{ my: 6 }}
              onChange={handleInputChange}
              variant="standard"
              name="roomId"
            />}
            <TextField
              required
              id="name-id"
              onChange={handleInputChange}
              label="Enter your name"
              variant="standard"
              name="name"
            />
            <FormControlLabel sx={{ mt: 5 }} control={
              <Checkbox
                checked={roomState.isConnectedOnlyWithAudio}
                onChange={handleCheckboxChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />}
              label="Only Audio"
            />
          </Box>
          <Box sx={{ mt: 20, width: '100%', display: 'flex', justifyContent: 'center', 'button': { width: 200 } }}>
            <Button variant="contained" onClick={handleJoinRoom}>{roomState.isRoomHost ? "Host" : "Join"}</Button>
            <Button variant="outlined" sx={{ ml: 8 }} onClick={() => navigate('/', { replace: true })}>Cancel</Button>
          </Box>
        </Paper>
      </Container>
    </MainBg>
  )
}

export default JoinRoomPage