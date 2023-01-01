# build
FROM node:18.12.1 AS development

WORKDIR /project/frontend/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli@15.0.4

COPY . .

RUN npm run build

EXPOSE 4200
