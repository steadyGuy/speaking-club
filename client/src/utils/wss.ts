import { SignalData } from "simple-peer";
import io, { Socket } from "socket.io-client";
import { store } from "../store";
import {
  setParticipants,
  setRoomId,
} from "../store/action-creators/roomInfoActions";
import {
  handleSignalingData,
  prepareNewPeerConnection,
  removePeerConnection,
} from "./webRTCHanlder";
const SERVER = `${process.env.REACT_APP_HOST}`;

let socket: Socket | null = null;

export const connectWithSocketIOServer = () => {
  socket = io(SERVER);

  socket.on("connect", () => {
    console.log("Successfully connected");
    if (socket) {
      console.log(socket.id);

      socket.on("room-id", (data) => {
        const { roomId } = data;
        store.dispatch(setRoomId(roomId));
      });

      socket.on("room-update", (data) => {
        const { connectedUsers } = data;
        store.dispatch(setParticipants(connectedUsers));
      });

      socket.on("conn-prepare", (data: any) => {
        const { connUserSocketId } = data;
        console.log("connUserSocketId", connUserSocketId);
        prepareNewPeerConnection(connUserSocketId, false);

        // inform the user who just join the room that we have prepared for incoming connection
        socket?.emit("conn-init", { connUserSocketId });
      });

      socket.on("conn-signal", (data) => {
        handleSignalingData(data);
      });

      socket.on("conn-init", (data) => {
        prepareNewPeerConnection(data.connUserSocketId, true);
      });

      socket.on("user-disconnected", (data) => {
        removePeerConnection(data);
      });
    }
  });
};

export const createNewRoom = (
  user: {
    name: string;
    id: string;
  },
  onlyAudio: boolean
) => {
  socket?.emit("create-new-room", { user, onlyAudio });
};

export const joinRoom = (
  user: { id: string; name: string },
  roomId: string,
  onlyAudio: boolean
) => {
  const data = {
    roomId,
    user,
    onlyAudio,
  };

  socket?.emit("join-room", data);
};

export const signalPeerData = (data: {
  signal: SignalData;
  connUserSocketId: string;
}) => {
  socket?.emit("conn-signal", data);
};
