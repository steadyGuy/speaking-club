import { store } from "../store";
import { setError } from "../store/action-creators/errorActions";
import { RoomInfoActionTypes } from "../store/action-types/roomInfoActionTypes";
import { createNewRoom, joinRoom, signalPeerData } from "./wss";
import Peer, { Instance, SignalData } from "simple-peer";

const defaultConstraints = {
  audio: true,
  video: true,
};

let localStream: MediaStream;

export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost: boolean,
  identity: { id: string; name: string },
  roomId: string | null = null
) => {
  try {
    store.dispatch({ type: RoomInfoActionTypes.LOADING_ROOM_INFO });
    localStream = await navigator.mediaDevices.getUserMedia(defaultConstraints);

    showLocalVideoPreview(localStream);

    if (isRoomHost) {
      createNewRoom(identity);
    } else if (roomId) {
      joinRoom(identity, roomId);
    }
  } catch (error: any) {
    store.dispatch(setError(error.message));
  } finally {
    store.dispatch({ type: RoomInfoActionTypes.LOADING_ROOM_INFO });
  }
};

export const showLocalVideoPreview = (stream: MediaStream) => {
  const root = document.getElementById("participants-container");
  const videoWrapper = document.createElement("div");
  videoWrapper.classList.add("video_track_container");
  const videoEl = document.createElement("video");
  videoEl.autoplay = true;
  videoEl.muted = true;
  videoEl.srcObject = stream;

  videoEl.onloadedmetadata = () => {
    videoEl.play();
  };

  videoWrapper.append(videoEl);
  root?.append(videoWrapper);
};

let peers: Record<string, Instance> = {};
let streams: MediaStream[] = [];

const getConfiguration = () => ({
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
});

const addStream = (stream: MediaStream, connUserSocketId: string) => {
  const root = document.getElementById("participants-container");
  const videoWrapper = document.createElement("div");

  videoWrapper.id = connUserSocketId;

  videoWrapper.classList.add("video_track_container");
  const videoEl = document.createElement("video");
  videoEl.autoplay = true;
  videoEl.srcObject = stream;
  videoEl.id = `${connUserSocketId}-video`;

  videoEl.onloadedmetadata = () => {
    videoEl.play();
  };

  videoEl.addEventListener("click", () => {
    if (videoEl.classList.contains("full_screen")) {
      videoEl.classList.remove("full_screen");
    } else {
      videoEl.classList.add("full_screen");
    }
  });

  videoWrapper.append(videoEl);
  root?.append(videoWrapper);
};

export const prepareNewPeerConnection = (
  connUserSocketId: string,
  isInitiator: boolean
) => {
  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: localStream,
  });

  peers[connUserSocketId].on("signal", (data) => {
    // webRTC offer, webRTC answer (SDP info), ice candidates

    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (stream) => {
    console.log("new stream came");

    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });
};

export const handleSignalingData = ({
  connUserSocketId,
  signal,
}: {
  connUserSocketId: string;
  signal: SignalData;
}) => {
  // add signaling data to peer connection
  peers[connUserSocketId].signal(signal);
};

export const removePeerConnection = ({ socketId }: { socketId: string }) => {
  const videoWrapper = document.getElementById(socketId);
  const videoEl = document.getElementById(
    `${socketId}-video`
  ) as HTMLVideoElement;

  if (videoWrapper && videoEl) {
    const tracks = (videoEl.srcObject as MediaStream).getTracks();

    tracks.forEach((t) => t.stop());

    videoEl.srcObject = null;
    videoWrapper?.removeChild(videoEl);

    videoWrapper.parentNode?.removeChild(videoWrapper);

    if (peers[socketId]) {
      peers[socketId].destroy();
    }

    delete peers[socketId];
  }
};

export const toggleVideoCamera = (isDisabled: boolean) => {
  localStream.getVideoTracks()[0].enabled = isDisabled;
};

export const toggleVideoMicrophone = (isDisabled: boolean) => {
  localStream.getAudioTracks()[0].enabled = isDisabled;
};

export const toggleScreenShareVideo = (
  isActive: boolean,
  scrSharingStream: MediaStream | null = null
) => {
  if (isActive) {
    _switchVideoTracks(localStream);
  } else if (scrSharingStream) {
    _switchVideoTracks(scrSharingStream);
  }
};

const _switchVideoTracks = (stream: MediaStream) => {
  for (let socket_id in peers) {
    for (let index in (peers[socket_id] as any).streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          (peers[socket_id] as any).streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          (peers[socket_id] as any).replaceTrack(
            (peers[socket_id] as any).streams[0].getTracks()[index],
            stream.getTracks()[index2],
            (peers[socket_id] as any).streams[0]
          );
          break;
        }
      }
    }
  }
};
