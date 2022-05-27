import { RouteOptions, FastifyRequest, FastifyReply } from "fastify";
import S from "fluent-json-schema";

export const autoPrefix = "/api";

const rooms: any[] = [];
const connectedUsers = [];

export default async function status(fastify: any, opts: RouteOptions) {
  fastify.route({
    method: "GET",
    path: "/room-exists/:roomId",
    handler: onStatus,
    schema: {
      // description: "Returns status and version of the application",
      response: {
        200: S.object().prop("roomExists", S.boolean()),
        404: S.object().prop("roomExists", S.boolean()),
      },
    },
  });

  async function onStatus(req: FastifyRequest, reply: FastifyReply) {
    const { roomId } = req.params as any;
    const room = rooms.find((r) => r.id === roomId);

    if (room) {
      if (room.connectedUsers.length > 3) {
        return { roomExists: true, full: true };
      } else {
        return { roomExists: true, full: false };
      }
    } else {
      return { roomExists: false };
    }
  }
}
