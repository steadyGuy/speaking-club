import { randomUUID } from "crypto";
import { FastifyInstance } from "fastify";
import { Socket } from "socket.io";
import { IRoom, IUser } from "../types";

export let connectedUsers: IUser[] = [];
export let rooms: IRoom[] = [];

export const createNewRoomHandler = ({ user, onlyAudio }: any, soc: Socket) => {
  const roomId = randomUUID();

  console.log("host is created new room", roomId);

  const newUser = {
    identity: user,
    onlyAudio,
    socketId: soc.id,
    roomId,
  };

  connectedUsers = [...connectedUsers, newUser];

  const newRoom = {
    id: roomId,
    connectedUsers: [newUser],
  };

  soc.join(roomId);

  rooms = [...rooms, newRoom];

  soc.emit("room-id", { roomId });
  soc.emit("room-update", { connectedUsers: newRoom.connectedUsers });
};

export const joinRoomHandler = (
  data: {
    user: { name: string; id: string };
    roomId: string;
    onlyAudio: boolean;
  },
  soc: Socket,
  fastify: FastifyInstance
) => {
  const { user, roomId, onlyAudio } = data;

  const newUser = {
    identity: {
      name: user.name,
      id: user.id,
    },
    onlyAudio,
    socketId: soc.id,
    roomId,
  };

  const room = rooms.find((room) => room.id === roomId);

  if (!room) {
    throw new Error("Room Not Found");
  }

  room.connectedUsers = [...room.connectedUsers, newUser];

  soc.join(roomId);

  // add new user to connected users array
  connectedUsers = [...connectedUsers, newUser];

  // emit to all users who are already in this room to prepare peer connection
  room.connectedUsers.forEach((usr) => {
    if (usr.socketId !== newUser.socketId) {
      const data = {
        connUserSocketId: newUser.socketId,
      };

      fastify.io.to(usr.socketId).emit("conn-prepare", data);
    }
  });

  fastify.io
    .to(roomId)
    .emit("room-update", { connectedUsers: room.connectedUsers });
};

export const disconnectHandler = (soc: Socket, fastify: FastifyInstance) => {
  const user = connectedUsers.find((user) => user.socketId === soc.id);

  if (user) {
    const room = rooms.find((room) => room.id === user.roomId);

    if (!room) {
      throw new Error("Room Not Found");
    }

    // remove user from room in server
    room.connectedUsers = room.connectedUsers.filter(
      (user) => user.socketId !== soc.id
    );

    soc.leave(user.roomId);
    connectedUsers = connectedUsers.filter(
      (usr) => usr.identity.id !== user.identity.id
    );

    // close the room if amount of the users who will stay in the room wil be 0
    if (room.connectedUsers.length > 0) {
      // emit an event to rest of the users
      fastify.io
        .to(room.id)
        .emit("room-update", { connectedUsers: room.connectedUsers });

      // emit to all users who are still in the room that user disconnected

      fastify.io.to(room.id).emit("user-disconnected", { socketId: soc.id });
    } else {
      rooms = rooms.filter((r) => r.id !== room.id);
    }
  }
};

export const signalingDataHandler = (
  { connUserSocketId, signal }: any,
  soc: Socket,
  fastify: FastifyInstance
) => {
  const signalingData = { signal, connUserSocketId: soc.id };
  fastify.io.to(connUserSocketId).emit("conn-signal", signalingData);
};

// information from clients which are already in room that they have prepared for incoming connection
export const initiallizeConnectionHandler = (
  { connUserSocketId }: any,
  soc: Socket,
  fastify: FastifyInstance
) => {
  const initData = { connUserSocketId: soc.id };
  fastify.io.to(connUserSocketId).emit("conn-init", initData);
};
