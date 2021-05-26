FROM mhart/alpine-node:14.15.4

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn
RUN yarn db:sync
RUN yarn db:migrate

COPY . .

CMD ["yarn", "start"]
