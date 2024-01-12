const { buildFastify } = require('./server/server');
const { writeApiDoc } = require('./lib/helpers/documantation-scripts');

try {
  (async () => {
    const fastify = await buildFastify();

    await fastify.listen({
      port: fastify.config.PORT,
      host: fastify.config.HOST,
    });

    await writeApiDoc(fastify);

  })();
} catch (err) {
  console.log(err);
  process.exit(1);
}
