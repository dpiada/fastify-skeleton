'use strict';

const fp = require('fastify-plugin');

const { DB_SERVICE, DB_USER: user, DB_PASSWORD: password, DB_NAME: database } = process.env;

if (!DB_SERVICE) {
    throw new Error('Database not defined');
}

const [host, port] = DB_SERVICE.split(':');

const knex = require('knex')({
    client: 'postgres',
    useNullAsDefault: true,
    connection: {
        host,
        port,
        user,
        password,
        database
    }
 });

async function Knex (fastify, opts, next) {

    fastify.decorate('knex', knex);

    next();
}

module.exports = fp(Knex)