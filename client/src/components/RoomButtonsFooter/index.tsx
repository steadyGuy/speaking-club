import { Box, IconButton, useTheme, } from '@mui/material'
import React, { useState } from 'react'
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import NoCameraIcon from '@mui/icons-material/NoPhotography';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import CloseIcon from '@mui/icons-material/Close';
import { toggleScreenShareVideo, toggleVideoCamera, toggleVideoMicrophone } from '../../utils/webRTCHanlder';
import { useAppDispatch } from '../../store/hooks';
import { setError } from '../../store/action-creators/errorActions';
import LocalScreenSharingPreview from '../LocalScreenSharingPreview';

const RoomButtonsFooter = () => {
  const dispatch = useAppDispatch();
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState<MediaStream | null>(null);
  const theme = useTheme()

  const toggleMicrophone = () => {
    setIsMuted((prev) => !prev);
    toggleVideoMicrophone(isMuted);
  }

  const toggleCamera = () => {
    setIsCameraOn((prev) => !prev)
    toggleVideoCamera(!isCameraOn);
  }

  const toggleScreenSharing = async () => {

    if (!isScreenSharing) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia({
          audio: false,
          video: true
        });
        if (stream) {
          setScreenSharingStream(stream);

          toggleScreenShareVideo(isScreenSharing, stream);
          setIsScreenSharing(true);
        }
      } catch (err) {
        dispatch(setError("An error occured when trying to get an access to screen share stream"))
        setIsScreenSharing(false)
      }
    } else {
      toggleScreenShareVideo(isScreenSharing);
      // switch to video track from camera
      setIsScreenSharing(false);
      screenSharingStream?.getTracks().forEach(t => t.stop());
      setScreenSharingStream(null);
      // stop screen share stream
    }

  }

  const handleLeavingRoom = () => {
    window.location.href = window.location.origin;
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
          {isScreenSharing && <LocalScreenSharingPreview stream={screenSharingStream as MediaStream} />}
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