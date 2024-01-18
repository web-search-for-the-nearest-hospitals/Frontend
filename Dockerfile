FROM node:lts-bookworm-slim as build
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . .
RUN npm run build