FROM node:14-alpine

ENV NODE_ENV=production
ENV KNEX_HOST=host.docker.internal

WORKDIR /app

COPY . .

RUN yarn global add webpack@4.42.1 webpack-cli@3.3.11

RUN yarn install --production=false

EXPOSE 4000

CMD [ "yarn", "start" ]