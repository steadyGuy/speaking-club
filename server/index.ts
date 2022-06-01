import Fastify from "fastify";
import App from "./app";
import fastifyIO from "fastify-socket.io";
import {
  createNewRoomHandler,
  disconnectHandler,
  initiallizeConnectionHandler,
  joinRoomHandler,
  signalingDataHandler,
} from "./socket-handlers";
import { Socket } from "socket.io";
import setConfig from "./config";

// https://github.com/fastify/fastify-example-twitter/blob/3c237e399393961bfb66d3d5c36e6525c566ff85/index.js
const devLoggerOptions = {
  level: "info",
};

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

  fastify.ready((err: any) => {
    if (err) throw err;
    fastify.io.on("connection", (soc: Socket) => {
      console.info("Socket connected!", soc.id);
      soc.on("create-new-room", (data: any) => createNewRoomHandler(data, soc));
      soc.on("join-room", (data: any) => joinRoomHandler(data, soc, fastify));

      soc.on("disconnect", () => disconnectHandler(soc, fastify));
      soc.on("conn-signal", (data: any) =>
        signalingDataHandler(data, soc, fastify)
      );
      soc.on("conn-init", (data: any) =>
        initiallizeConnectionHandler(data, soc, fastify)
      );
    });
  });

  setConfig(fastify).ready(async (err) => {
    if (err) console.error(err);

    let config = (fastify as unknown as any).config;
    const port = config.PORT;
    console.log(config);
    await fastify.listen(port);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
