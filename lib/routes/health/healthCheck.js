'use strict';

const { authHandlerSchema } = require('../../auth/authHandlerSchema');

module.exports = {
    method: 'GET',
    url: '/v1/health',
    schema: {
        description: 'Get health status',
        tags: ['health'],    
    },    
    preHandler: authHandlerSchema.none,
    handler: async (request, reply) => {

        return reply.code(200).send({ status: 'OK' });
    }
}