'use strict';

const fp = require('fastify-plugin');

class DummyService {

    constructor(fastify){
        this.fastify = fastify
    }

    dummyMethod({ message }){
        return message;
    }
}

function dummyService (fastify, opts, next) {
  
    fastify.decorate('dummyService', new DummyService(fastify));

    next();
}
  
module.exports = fp(dummyService, { name: 'dummyService' })