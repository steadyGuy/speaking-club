import { Box, useTheme } from '@mui/material'
import zIndex from '@mui/material/styles/zIndex';
import React from 'react'

const Logo = () => {
  const theme = useTheme();

  return (
    <Box component="span" sx={{
      color: theme.palette.primary.main,
      textTransform: 'uppercase',
      fontSize: '40px',
      lineHeight: '40px',
      fontWeight: 'bold',
      letterSpacing: '7px',
      textAlign: 'center',
      width: '100%',
      zIndex: 1000
    }}>
      Speaking-club
    </Box>
  )
}

export default Logo