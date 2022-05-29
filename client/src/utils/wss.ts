import io, { Socket } from "socket.io-client";
import { store } from "../store";
import {
  setParticipants,
  setRoomId,
} from "../store/action-creators/roomInfoActions";
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
    }
  });
};

export const createNewRoom = (identity: string) => {
  const data = {
    identity,
  };

  socket?.emit("create-new-room", data);
};

export const joinRoom = (identity: string, roomId: string) => {
  const data = {
    roomId,
    identity,
  };

  socket?.emit("join-room", data);
};
