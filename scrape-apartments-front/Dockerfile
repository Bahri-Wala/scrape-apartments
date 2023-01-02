# build frontend
FROM node:18.12.1 AS builder

WORKDIR /project/frontend/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli@15.0.4

COPY . .

RUN npm run build

# serve frontend with Nginx
FROM nginx:1.19.0

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /project/frontend/src/app/dist/scrape-apartments-front .

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
