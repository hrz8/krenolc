FROM node:14.15.4-alpine

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

CMD ["yarn", "start"]
