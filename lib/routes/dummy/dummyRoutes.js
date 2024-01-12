'use strict';

const { authHandlerSchema } = require('../../auth/authHandlerSchema');

module.exports = {
    method: 'GET',
    url: '/v1/dummy',
    schema: {
        description: `It's only a dummy route`,
        tags: ['dummy'],    
    },    
    preHandler: authHandlerSchema.none,
    handler: async (request, reply) => {

        const { dummyService } = request.fastify;

        return reply.code(200).send({ message: dummyService.dummyMethod({ message: 'I am a dummy'}) });
    }
}