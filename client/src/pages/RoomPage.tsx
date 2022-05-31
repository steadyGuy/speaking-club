import { Box, Container, Grid, Typography, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import ParticipantsList from '../components/ParticipantsList';
import { getLocalPreviewAndInitRoomConnection } from '../utils/webRTCHanlder';
import RoomButtonsFooter from '../components/RoomButtonsFooter';
import { useAppSelector } from '../store/hooks';
import Loader from '../components/Loader';
import Chat from '../components/Chat';

const RoomPage = () => {
  const theme = useTheme();
  const roomInfo = useAppSelector((state) => state.roomInfo);

  useEffect(() => {

    if (!roomInfo.isRoomHost && !roomInfo.roomId) {
      window.location.href = window.location.origin;
    } else {
      getLocalPreviewAndInitRoomConnection(
        roomInfo.isRoomHost,
        roomInfo.identity,
        roomInfo.roomId,
        roomInfo.isConnectedOnlyWithAudio
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container sx={{ pt: 4, height: '100vh' }}>
      {roomInfo.loading && <Loader />}
      <Grid columns={12} container spacing={4} sx={{ color: theme.palette.grey[50], height: '100%' }}>
        <Grid item xs={3}>
          <Typography variant="h3" sx={{ textTransform: 'uppercase' }}>
            Participants
          </Typography>
          <Box sx={{ mt: 5 }}>
            <ParticipantsList />
          </Box>
        </Grid>
        <Grid item xs={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
          }}
        >
          <Box sx={{
            height: 48,
            margin: '0 auto',
            width: 424,
            background: 'linear-gradient(180deg, #4E68FF 0%, #314EF2 99.99%, rgba(206, 213, 255, 0) 100%)',
            borderRadius: Number(theme.shape.borderRadius) * 1
          }}
          >
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#fff',
                'span': {
                  fontWeight: 700
                }
              }}
            >
              <span>ID:&nbsp;</span>
              {roomInfo.roomId}
            </Typography>
          </Box>
          <Box
            id="participants-container"
            sx={{ display: 'flex', flexWrap: 'wrap', height: '100%', alignItems: 'center', position: 'relative' }}
          />
          <RoomButtonsFooter />
        </Grid>
        <Grid item xs={3}>
          <Chat />
        </Grid>
      </Grid>
    </Container>
  )
}

export default RoomPage