const Fs = require('fs').promises;

module.exports.writeApiDoc = async (fastify) => {
  const yaml = fastify.swagger({ yaml: true });
  await Fs.writeFile('./swagger-api.yaml', yaml);
};
