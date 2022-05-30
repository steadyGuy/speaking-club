import Fastify from "fastify";
import App from "./app";
import fastifyIO from "fastify-socket.io";
import { Socket } from "socket.io";
import { randomUUID } from "crypto";
import { IRoom, IUser } from "./types";

const devLoggerOptions = {
  level: "info",
};

export let connectedUsers: IUser[] = [];
export let rooms: IRoom[] = [];
const fastify = Fastify({
  trustProxy: true,
  logger: devLoggerOptions,
});

async function start() {
  fastify.register(App);

  fastify.register(fastifyIO, {
    cors: {
      origin: "*",
    },
  });

  fastify.ready((err) => {
    if (err) throw err;

    fastify.io.on("connection", (soc) => {
      console.info("Socket connected!", soc.id);
      soc.on("create-new-room", (data) => createNewRoomHandler(data, soc));
      soc.on("join-room", (data) => joinRoomHandler(data, soc));

      soc.on("disconnect", () => disconnectHandler(soc));
      soc.on("conn-signal", (data) => signalingDataHandler(data, soc));
      soc.on("conn-init", (data) => initiallizeConnectionHandler(data, soc));
    });
  });

  const port = process.env.PORT || 8080;
  const address = undefined;
  await fastify.listen(port, address);
}

const createNewRoomHandler = (
  { name, id }: { name: string; id: string },
  soc: Socket
) => {
  const roomId = randomUUID();

  console.log("host is created new room", roomId);

  const newUser = {
    identity: {
      name,
      id: id,
    },
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

const joinRoomHandler = (
  data: { user: { name: string; id: string }; roomId: string },
  soc: Socket
) => {
  const { user, roomId } = data;

  const newUser = {
    identity: {
      name: user.name,
      id: user.id,
    },
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

start().catch((err) => {
  console.error(err);
  process.exit(1);
});

const disconnectHandler = (soc: Socket) => {
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
    } else {
      rooms = rooms.filter((r) => r.id !== room.id);
    }
  }
};

const signalingDataHandler = (
  { connUserSocketId, signal }: any,
  soc: Socket
) => {
  const signalingData = { signal, connUserSocketId: soc.id };
  fastify.io.to(connUserSocketId).emit("conn-signal", signalingData);
};

// information from clients which are already in room that they have prepared for incoming connection
const initiallizeConnectionHandler = (
  { connUserSocketId }: any,
  soc: Socket
) => {
  const initData = { connUserSocketId: soc.id };
  fastify.io.to(connUserSocketId).emit("conn-init", initData);
};
