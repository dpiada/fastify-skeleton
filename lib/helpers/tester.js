// eslint-disable-next-line import/no-extraneous-dependencies
const tap = require('tap');
// eslint-disable-next-line import/no-extraneous-dependencies
const Ajv = require('ajv');
const { buildFastify } = require('../../server/server');

const serverTestWrapper = async () => {
  const fastify = await buildFastify();
  await fastify.listen({
    port: 0,
  });

  return fastify;
};

const test = async ({
  fastify, description, setUpCallback, testCallback, dataSchema,
}) => {
  tap.test(description, async () => {
    const response = await fastify.inject(await setUpCallback({ fastify }));
    if (dataSchema) {
      const ajv = new Ajv();
      const validate = ajv.compile(dataSchema);
      const valid = validate(JSON.parse(response.body));
      tap.equal(valid, true);
      if (!valid) {
        console.log(JSON.parse(response.body));
        console.error(validate.errors);
        throw new Error('validation Error');
      }
    }
    await testCallback({ tap, response, fastify });
  });
};

/**
 *
 * @param {*} description
 * @param {Object} buildRequst
 * e.g { url: "/v1/firmware-manager/health", method: "GET" }
 * @param {Function} testCallback
 */
const testRoute = async (tests) => {
  const fastify = await serverTestWrapper();

  await tests.map(async ({
    description, setUpCallback, testCallback, dataSchema,
  }) => {
    await test({
      fastify, description, setUpCallback, testCallback, dataSchema,
    });
  });

  tap.teardown(() => {
    fastify.close();
    process.exit(0);
  });
};

module.exports = {
  serverTestWrapper,
  testRoute,
  test,
};
