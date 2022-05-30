import { store } from "../store";
import { setError } from "../store/action-creators/errorActions";
import { RoomInfoActionTypes } from "../store/action-types/roomInfoActionTypes";
import { createNewRoom, joinRoom, signalPeerData } from "./wss";
import Peer, { Instance, SignalData } from "simple-peer";
import { setParticipants } from "../store/action-creators/roomInfoActions";

const defaultConstraints = {
  audio: true,
  video: true,
};

let localStream: MediaStream;

export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost: boolean,
  identity: { id: string; name: string },
  roomId: string | null = null,
  root: HTMLDivElement
) => {
  try {
    store.dispatch({ type: RoomInfoActionTypes.LOADING_ROOM_INFO });
    localStream = await navigator.mediaDevices.getUserMedia(defaultConstraints);

    showLocalVideoPreview(localStream, root);

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

export const showLocalVideoPreview = (
  stream: MediaStream,
  root: HTMLDivElement
) => {
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
  root.append(videoWrapper);

  // store.dispatch(
  //   setParticipants({
  //     userId: store.getState().roomInfo.identity.id,
  //     stream,
  //   })
  // );
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
  videoEl.muted = true;
  videoEl.srcObject = stream;
  videoEl.id = `${connUserSocketId}-video`;

  videoEl.onloadedmetadata = () => {
    videoEl.play();
  };

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
