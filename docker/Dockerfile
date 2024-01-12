FROM node:iron AS base

WORKDIR /home/node/workdir

RUN chown node:node /home/node/workdir

USER node:node

COPY docker/run.sh /usr/local/bin/run.sh

EXPOSE 3000

FROM base as local_dev

CMD ["run.sh", "development"]

FROM base as release

COPY --chown=node:node ./ /home/node/workdir
RUN rm -rf /home/node/workdir/docker

RUN npm ci

CMD ["run.sh", "production"]

FROM release as test

RUN npm run test-coverage


