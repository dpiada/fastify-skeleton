'use strict'

const jwtValidation = async (request, reply) => {

    const { authorization } = request.headers;
    const { authenticationService, knex } = request.fastify;

    try {
        const { profile } = await authenticationService.decodeJwt({ jwtToken: authorization.split(' ')[1] });
        const { user } = profile;
    
        if(!user){
            return reply.status(401);
        }
    
        request.currentUser = user;
        
    } catch (error) {
        
        request.log.error(error);
        return reply.status(401);
    }
}

module.exports = {
    jwtValidation
}