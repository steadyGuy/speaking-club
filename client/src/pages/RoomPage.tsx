import { Box, CircularProgress, Container, Grid, Typography, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import ParticipantsList from '../components/ParticipantsList';
import { getLocalPreviewAndInitRoomConnection } from '../utils/webRTCHanlder';
import RoomButtonsFooter from '../components/RoomButtonsFooter';
import { useAppSelector } from '../store/hooks';
import Loader from '../components/Loader';

const RoomPage = () => {
  const theme = useTheme();
  const roomInfo = useAppSelector((state) => state.roomInfo);

  const participants = [
    {
      identity: "John Smith"
    },
    {
      identity: "Vasia Pupkin"
    },
    {
      identity: "Muhammad Ali"
    }
  ];

  useEffect(() => {
    getLocalPreviewAndInitRoomConnection(
      roomInfo.isRoomHost,
      roomInfo.identity,
      roomInfo.roomId,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (roomInfo.loading) return <Loader />

  return (
    <Container sx={{ pt: 4, height: '100vh' }}>
      <Grid container spacing={0} sx={{ color: theme.palette.grey[50], height: '100%' }}>
        <Grid item xs={3}>
          <Typography variant="h3" sx={{ textTransform: 'uppercase' }}>
            Participants
          </Typography>
          <Box sx={{ mt: 5 }}>
            <ParticipantsList />
          </Box>
        </Grid>
        <Grid item xs={7} sx={{ background: 'green', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
          <Box>Grid items</Box>
          <RoomButtonsFooter />
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
    </Container>
  )
}

export default RoomPage