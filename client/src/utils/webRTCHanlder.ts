import { store } from "../store";
import { setError } from "../store/action-creators/errorActions";
import { RoomInfoActionTypes } from "../store/action-types/roomInfoActionTypes";
import { createNewRoom, joinRoom, signalPeerData } from "./wss";
import Peer, { Instance, SignalData } from "simple-peer";
import { setMessages } from "../store/action-creators/roomInfoActions";
import { IMessage } from "../types";

const defaultConstraints = {
  audio: true,
  video: true,
};

let localStream: MediaStream;

export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost: boolean,
  identity: { id: string; name: string },
  roomId: string | null = null,
  onlyAudio: boolean
) => {
  try {
    store.dispatch({ type: RoomInfoActionTypes.LOADING_ROOM_INFO });
    localStream = await navigator.mediaDevices.getUserMedia(
      onlyAudio ? { audio: true, video: false } : defaultConstraints
    );

    showLocalVideoPreview(localStream);

    if (isRoomHost) {
      createNewRoom(identity, onlyAudio);
    } else if (roomId) {
      joinRoom(identity, roomId, onlyAudio);
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

  if (store.getState().roomInfo.isConnectedOnlyWithAudio) {
    videoWrapper.append(
      _getAudioOnlyLabel(store.getState().roomInfo.identity.name)
    );
  }

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

  // check if other user connected only with audio
  const participants = store.getState().roomInfo.participants;
  const participant = participants.find((p) => p.socketId === connUserSocketId);

  if (participant?.onlyAudio) {
    videoWrapper.append(_getAudioOnlyLabel(participant.identity.name));
  }

  root?.append(videoWrapper);
};

const _getAudioOnlyLabel = (name: string) => {
  const labelContainer = document.createElement("div");
  labelContainer.classList.add("audio-container");

  const label = document.createElement("p");
  label.classList.add("label_only_audio_text");
  label.innerHTML = `Only Audio: ${name}`;

  labelContainer.appendChild(label);
  return labelContainer;
};

export const prepareNewPeerConnection = (
  connUserSocketId: string,
  isInitiator: boolean
) => {
  const Pp = (window as any).SimplePeer as typeof Peer;
  peers[connUserSocketId] = new Pp({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: localStream,
    channelName: "messenger",
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
  peers[connUserSocketId].on("data", (data) => {
    const messageData = JSON.parse(data);
    _appendNewMessage(messageData);
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

////////////////////// MESSAGES //////////////////////

const _appendNewMessage = (msg: IMessage) => {
  const messages = store.getState().roomInfo.messages;
  store.dispatch(setMessages([...messages, msg]));
};

export const sendMsgUsingDataChannel = (msgText: string) => {
  // append this message locally

  const user = store.getState().roomInfo.identity;

  const localMessageData: IMessage = {
    message: msgText,
    time: new Date().toLocaleTimeString(),
    author: user.name,
    isAuthor: true,
  };

  _appendNewMessage(localMessageData);

  const msgDataStr = JSON.stringify({
    message: msgText,
    time: new Date().toLocaleTimeString(),
    author: user.name,
  });
  Object.keys(peers).forEach((socId) => {
    peers[socId].send(msgDataStr);
  });
};
