import { FastifyInstance } from "fastify";
import Cors from "@fastify/cors";
import Env from "@fastify/env";
import fastifyIO from "fastify-socket.io";
import S from "fluent-json-schema";

export default async function (fastify: FastifyInstance) {
  fastify.get("/ping", async (request, reply) => {
    return "pong\n";
  });

  fastify.register(Env, {
    schema: S.object()
      // .prop("NODE_ENV", S.string().required())
      .prop("PORT", S.integer())
      .valueOf(),
  });

  fastify.register(Cors, {
    origin: "*",
    methods: ["GET", "POST"],
  });

  fastify.register(fastifyIO);
}
