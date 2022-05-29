import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    <Box sx={{
      width: '100wv',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    >
      <CircularProgress size={62} />
    </Box>
  )
}

export default Loader