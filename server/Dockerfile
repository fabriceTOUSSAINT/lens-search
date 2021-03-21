FROM node:14-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ./package.json ./
COPY ./src ./src
COPY ./webpack.*.js ./
COPY ./tsconfig.json ./
COPY ./.env ./

RUN yarn global add webpack@4.42.1 webpack-cli@3.3.11

RUN yarn install --production=false

RUN yarn build:prod

EXPOSE 4000

CMD [ "yarn", "start:prod" ]