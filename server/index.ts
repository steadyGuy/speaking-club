import Fastify from "fastify";
import App from "./app";

const devLoggerOptions = {
  level: "info",
};

async function start() {
  const fastify = Fastify({
    trustProxy: true,
    logger: devLoggerOptions,
  });
  fastify.register(App);
  const port = process.env.PORT || 3000;
  const address = undefined;
  await fastify.listen(port, address);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
