'use strict';

const Path = require('path');
const Fastify = require('fastify');
const FastifyEnv = require('@fastify/env');
const Autoload = require('@fastify/autoload');
const { schema } = require('../lib/configurations/config');
const FastifyJWT = require('@fastify/jwt');
const FastifyCORS = require('@fastify/cors');
const FastifySwagger = require('@fastify/swagger');
const Package = require('../package.json');

exports.buildFastify = async () => {

    const fastify = Fastify({
        logger: true
    })

    await fastify.register(FastifyEnv, { 
      confKey: 'config', 
      schema, 
      data: process.env 
    });

    await fastify.register(FastifySwagger, {
      swagger: {
        info: {
          title: Package.name,
          description: Package.description,
          version: Package.version,
        },
      },
    });
  
    fastify.register(Autoload, {
        dir: Path.join(__dirname, '..', 'lib', 'services')
    });

    await fastify.register(Autoload, {
        dir: Path.join(__dirname, '..', 'lib', 'routes'),
        dirNameRoutePrefix: false
    });

    await fastify.register(FastifyJWT, {
        secret: fastify.config.JWT_SECRET
    })

    await fastify.register(FastifyCORS, { origin: '*' });

    fastify.decorateRequest('fastify', null)    
    fastify.addHook("onRequest", async (req) => {
        req.fastify = fastify;
    });

    return fastify
};