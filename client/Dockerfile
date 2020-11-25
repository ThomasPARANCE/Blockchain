FROM node:10-alpine

RUN mkdir -p /home/node
WORKDIR /home/node

COPY package.json /home/node
COPY yarn.lock /home/node
COPY . /home/node

RUN yarn install

CMD ["yarn", "start"]