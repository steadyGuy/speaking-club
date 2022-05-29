import Fastify from "fastify";
import App from "./app";
import fastifyIO from "fastify-socket.io";
import { Socket } from "socket.io";
import { randomUUID } from "crypto";

const devLoggerOptions = {
  level: "info",
};

export let connectedUsers: any[] = [];
export let rooms: any[] = [];
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
    });
  });

  const port = process.env.PORT || 8080;
  const address = undefined;
  await fastify.listen(port, address);
}

const createNewRoomHandler = (data: any, soc: Socket) => {
  console.log("host is created new room", data);

  const { identity } = data;

  const roomId = randomUUID();

  const newUser = {
    identity,
    id: randomUUID(),
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

const joinRoomHandler = (data: any, soc: Socket) => {
  const { identity, roomId } = data;

  const newUser = {
    identity,
    id: randomUUID(),
    socketId: soc.id,
    roomId,
  };

  const room = rooms.find((room) => room.id === roomId);
  room.connectedUsers = [...room.connectedUsers, newUser];

  soc.join(roomId);
  connectedUsers = [...connectedUsers, newUser];

  fastify.io
    .to(roomId)
    .emit("room-update", { connectedUsers: room.connectedUsers });
};

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
