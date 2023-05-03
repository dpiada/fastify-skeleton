'use strict';

const Path = require('path');
const Fastify = require('fastify');
const FastifyEnv = require('@fastify/env');
const FastifyMongo = require('@fastify/mongodb');
const Knex = require('../lib/plugins/knex');
const AWS_SNS = require('../lib/plugins/aws.sns');
const Autoload = require('@fastify/autoload');
const { schema } = require('../lib/configurations/config');
const FastifyAMPQ = require('../lib/plugins/ampq');
const FastifyJWT = require('@fastify/jwt');
const FastifyCORS = require('@fastify/cors');
const FastifySwagger = require('@fastify/swagger');
const FastifySwaggerUI = require('@fastify/swagger-ui');

exports.deployment = async (start) => {

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
            title: 'Test swagger',
            description: 'Testing the Fastify swagger API',
            version: '0.1.0'
          },
          externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
          },
          host: 'localhost',
          schemes: ['http'],
          consumes: ['application/json'],
          produces: ['application/json']
        }
      });


    await fastify.register(Autoload, {
        dir: Path.join(__dirname, '..', 'lib', 'services')
    });

    await fastify.register(Autoload, {
        dir: Path.join(__dirname, '..', 'lib', 'routes'),
        dirNameRoutePrefix: false
    });

    await fastify.register(Knex);


    await fastify.register(FastifyJWT, {
        secret: fastify.config.JWT_SECRET
    })

    await fastify.register(FastifyCORS, { origin: '*' });


    await fastify.register(FastifySwaggerUI,  {
      routePrefix: '/documentation',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false
      },
      uiHooks: {
        onRequest: function (request, reply, next) { next() },
        preHandler: function (request, reply, next) { next() }
      },
      staticCSP: true,
      transformStaticCSP: (header) => header,
      transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
      transformSpecificationClone: true
    });

    if (!start) {
        return fastify;
    }

    fastify.decorateRequest('fastify', null)    
    fastify.addHook("onRequest", async (req) => {
        req.fastify = fastify;
    });

    const server = await fastify.listen({ port: fastify.config.PORT, host: fastify.config.HOST });

    return { server, fastify };
};