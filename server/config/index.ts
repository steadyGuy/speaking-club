import { FastifyInstance } from "fastify";
import Env from "@fastify/env";

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string",
      default: 8080,
    },
    TWILIO_SID: {
      type: "string",
      default: "",
    },
    TWILIO_AUTH_TOKEN: {
      type: "string",
      default: "",
    },
  },
};

const options = {
  confKey: "config", // optional, default: 'config'
  schema: schema,
  dotenv: true,
  data: process.env, // optional, default: process.env
};

const setConfig = (fastify: FastifyInstance) => {
  return fastify.register(Env, options);
};

export default setConfig;
