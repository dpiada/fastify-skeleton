'use strict';

const { deployment } = require('./server/server');

try {

    const serverPromise = deployment(true);

    (async () => {

        const { fastify } = await serverPromise;

        //Here it's possibile create instances foor runner
    })();
} catch (err) {
    console.log(err)
    process.exit(1)
}