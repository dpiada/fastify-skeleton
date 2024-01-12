# Fastify skeleton

This project is a skeleton for helping developers who want use fastify for their backend.
The target of this project it's give a scaffolding with main elements of a micro-service.

## project structure
Following there is a scaffolding of the project.

```
├── docker 
├── index.js
├── lib
│   ├── auth
│   ├── configurations
│   ├── helpers
│   ├── plugins
│   ├── routes
│   └── services
├── package.json
├── package-lock.json
├── README.md
├── server
├── swagger-api.yaml
└── test
```

- **docker**: It contains docker-compose, docker file and scripts useful to run the project
- **index**: It's the start point of the web server
- **lib**: It's the core of this web server
    - **auth**: It contains file useful to create auth scheme, like jwt or none. 
    - **configuration**: It contains config files
    - **helpers**: It contains scripts and methods useful to start tests or portion of code for manage strings or create random stuff
    - **plugins**: This Folder it dedicated to fastify plugin, like knex, ampqlib
    - **routes**: This folder contains file that define routes
    - **services**: This folder contains controller files
- **server**: It contains server file used to register plugin
- **test**: Folder where define tests.

## Start the service
Execute these steps.

1. Move into service folder \
`cd fastfy-skeleton`
2. Install dependecies \
`npm install`
3. Move to docker folder \
`docker compose up`

## Run tests
With docker container in running.

launch `npm run test` or `npm run test-coverage`

## Route documentation
In script utils there is a script that run swagger create commands.
Run automatically on the start or restart of the server.

## API Documentations
---
[Api Documentation](swagger-api.yaml)

## Useful links

- (fatsify)[https://fastify.dev/]
- (nope-tap)[https://node-tap.org/]
- (docker)[https://www.docker.com/]




