# A base stage that installs all of the base dependencies
FROM node:lts-alpine AS base
WORKDIR /usr/local/app
COPY package.json yarn.lock ./

# A stage used solely for local development, as it will watch for file changes
# and auto-restart the application. The yarn dev script will run a yarn install
# and then start nodemon, watching for file changes.
FROM base AS dev
CMD ["yarn", "dev"]


# A stage used for deployment
FROM base AS prod
RUN adduser -D -H -u 10000 app-user
RUN yarn install && yarn cache clean
COPY --chown=app-user:app-user src ./src
USER app-user
EXPOSE 3000
CMD ["node", "src/index.js"]