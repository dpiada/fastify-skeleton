FROM node:18.15 AS base

WORKDIR /home/node/workdir

RUN chown node:node /home/node/workdir

USER node:node

COPY docker/run.sh /usr/local/bin/run.sh
COPY docker/wait-for-it.sh /usr/local/bin/wait-for-it.sh

FROM base as local_dev

CMD ["run.sh", "development"]

FROM base as release

COPY --chown=node:node ./ /home/node/workdir
RUN rm -rf /home/node/workdir/docker

RUN npm ci

CMD ["run.sh", "production"]

FROM release as test

ARG DB_SERVICE
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME
RUN npx knex migrate:latest && npx knex seed:run && npm run test-coverage


