import { Box, IconButton, useTheme, } from '@mui/material'
import React, { useState } from 'react'
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import NoCameraIcon from '@mui/icons-material/NoPhotography';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const RoomButtonsFooter = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const theme = useTheme()
  const navigate = useNavigate()

  const toggleMicrophone = () => {
    setIsMuted((prev) => !prev);
  }

  const toggleCamera = () => {
    setIsCameraOn((prev) => !prev)
  }

  const toggleScreenSharing = () => {
    setIsScreenSharing((prev) => !prev)
  }

  const handleLeavingRoom = () => {
    navigate('/', { replace: true });
  }

  return (
    <Box sx={{
      background: 'linear-gradient(180deg, #4E68FF 0%, #314EF2 99.99%, rgba(206, 213, 255, 0) 100%)',
      width: '100%',
      height: 70,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}
    >
      <Box sx={{ color: '#C5CDFF', display: 'flex', ml: 6, width: '100%', height: 'fit-content', 'button': { border: 'solid 1px #687EFF' } }}>
        <IconButton size="medium" onClick={toggleMicrophone} color="inherit">
          {isMuted ? <MicOffIcon /> : <MicIcon />}
        </IconButton>
        <IconButton size="medium" sx={{ ml: 4 }} color="inherit" onClick={toggleCamera}>
          {isCameraOn ? <CameraAltIcon /> : <NoCameraIcon />}
        </IconButton>
        <IconButton size="medium" sx={{ ml: 4 }} color="inherit" onClick={toggleScreenSharing}>
          {isScreenSharing ? <ScreenShareIcon /> : <StopScreenShareIcon />}
        </IconButton>
      </Box>
      <Box sx={{ color: '#fff' }}>
        <IconButton
          size="medium"
          sx={{ mr: 6, backgroundColor: theme.palette.error.light }}
          color="inherit"
          onClick={handleLeavingRoom}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default RoomButtonsFooter