'use strict';

const fp = require('fastify-plugin');

class AuthenticationService {

    constructor(fastify){
        this.fastify = fastify
    }

    async decodeJwt({ jwtToken }){
        const { jwt } = this.fastify;

        const jwtTokenDecoded = await jwt.decode(jwtToken);

        return jwtTokenDecoded;
    }
}

async function authenticationService (fastify, opts, next) {
  
    fastify.decorate('authenticationService', new AuthenticationService(fastify));

    next();
}
  
module.exports = fp(authenticationService, { name: 'authenticationService' })