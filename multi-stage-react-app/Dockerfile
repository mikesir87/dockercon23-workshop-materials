FROM node:lts-alpine AS build
WORKDIR /usr/local/app

# Install React build dependencies
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean

# Copy in the rest of the config and the application content
COPY .eslintrc.cjs vite.config.js index.html ./
COPY public ./public
COPY src ./src

# Perform the build itself, which drops the assets at /usr/local/app/dist
RUN yarn build

# TODO - Create a new stage that copies the built assets into the webroot of an nginx:alpine image
