import { RouteOptions, FastifyRequest, FastifyReply } from "fastify";
import S from "fluent-json-schema";
import { rooms } from "../socket-handlers";
import twilio from "twilio";

export const autoPrefix = "/api";

export default async function status(fastify: any, opts: RouteOptions) {
  fastify.route({
    method: "GET",
    path: "/get-turn-credentials",
    handler: getCredentialsHandler,
    schema: {
      response: {
        // 200: S.object().prop("token", S.object()),
        500: S.object().prop("error", S.string()).prop("token", S.null()),
      },
    },
  });

  async function getCredentialsHandler(
    req: FastifyRequest,
    reply: FastifyReply
  ) {
    const { TWILIO_SID, TWILIO_AUTH_TOKEN } = fastify.config;
    const client = twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);

    try {
      const token = await client.tokens.create();
      return { token };
    } catch (error) {
      return { error: "An error occured", token: null };
    }
  }
}
