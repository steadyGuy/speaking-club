import { Box, useTheme } from '@mui/material'
import { Container } from '@mui/system';
import React from 'react'
import ConnectingButton from '../components/ConnectingButton';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import MainBg from '../components/MainBg';

const IntroPage = () => {
  const theme = useTheme();

  return (
    <MainBg>
      <Container sx={{
        zIndex: theme.zIndex.appBar,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
      >
        <Logo />
        <Box sx={{
          display: 'flex',
          flexDirection: { lg: 'row', md: 'row', xs: 'column' },
          mt: 20,
          'a': { width: 294 }
        }}>
          <ConnectingButton variant="contained" title="Join a meeting" component={Link} to="/join-room" />
          <Box sx={{ ml: { lg: 20, md: 20, xs: 0 }, mt: { lg: 0, md: 0, xs: 5 } }}>
            <ConnectingButton variant="outlined" title="Host a meeting" component={Link} to="/join-room?host=true" />
          </Box>
        </Box>

      </Container>
    </MainBg>
  )
}

export default IntroPage