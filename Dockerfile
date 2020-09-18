FROM node:12.18.3-alpine3.12 AS builder
 
WORKDIR /app

COPY package.json ./
RUN npm install -g gulp
RUN npm link gulp
RUN npm install
COPY . .
EXPOSE 1212

CMD npm run dev
# FROM nginx:1.15.8-alpine
# COPY --from=builder /test-application/dist/test-application/ /usr/share/nginx/html

