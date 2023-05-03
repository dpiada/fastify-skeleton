'use strict'

const { jwtValidation } = require('../auth/strategies/jwt');
const { none } = require('../auth/strategies/none');

const authHandlerSchema =  {
    'none': async (request, reply) => await none(request, reply),
    'jwt': async (request, reply) => await jwtValidation(request, reply)
}

module.exports = {
    authHandlerSchema
}