# Specify Node Version and Image
FROM node:18.12.1 AS development

# Specify the working dir
WORKDIR /project/src/app

COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm ci
RUN npm run build

EXPOSE 3000

FROM node:18.12.1 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /project/src/app

COPY --from=development /project/src/app/ .

EXPOSE 3000

CMD ["node", "dist/main" ]