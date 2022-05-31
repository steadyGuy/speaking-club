import React, { FC, useEffect, useRef } from 'react'
import { Box } from '@mui/material';

export type LocalScreenSharingPreviewProps = {
  stream: MediaStream;
}

const LocalScreenSharingPreview: FC<LocalScreenSharingPreviewProps> = ({ stream }) => {

  const localPreviewRef = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    const video = localPreviewRef.current;
    if (video) {
      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video.play();
      }

    }
  }, [stream])


  return (
    <Box sx={{
      position: 'fixed',
      bottom: -8.6,
      left: 0,
      width: 250,
      height: 250,
      zIndex: 1000,
      'video': {
        position: 'relative'
      }
    }}
    >
      <video muted autoPlay ref={localPreviewRef}></video>
    </Box>
  )
}

export default LocalScreenSharingPreview