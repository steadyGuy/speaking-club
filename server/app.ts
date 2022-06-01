import { FastifyInstance } from "fastify";
import Cors from "@fastify/cors";
import AutoLoad from "@fastify/autoload";
import path from "path";

export default async function (fastify: FastifyInstance) {
  fastify.register(Cors, {
    origin: "*",
    methods: ["GET", "POST"],
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    dirNameRoutePrefix: false,
  });
}
