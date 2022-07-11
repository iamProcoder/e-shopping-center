FROM node:latest
COPY . /usr/src/app/shopping
WORKDIR /usr/src/app/shopping
COPY package.json yarn.lock ./
RUN yarn install
CMD yarn start