import { Box, useTheme } from '@mui/material'
import React, { PropsWithChildren } from 'react'

import bgImg from '../../resources/images/introduction-bg.png';

const MainBg = ({ children }: PropsWithChildren<{}>) => {
  const theme = useTheme();

  const bgStyles = {
    width: '100%',
    height: '100%',
    position: 'absolute'
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        backgroundColor: theme.palette.background.default
      }}>
      <Box sx={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        ...bgStyles,
      }}
      />
      <Box sx={{
        backgroundColor: theme.palette.background.default,
        opacity: 0.88,
        ...bgStyles,
      }}
      />
      {children}
    </Box>
  )
}

export default MainBg