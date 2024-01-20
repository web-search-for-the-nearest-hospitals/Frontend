FROM node:lts-bookworm-slim as build
ENV VITE_NODE_ENV $VITE_NODE_ENV
ENV VITE_YAMAP_API_KEY $VITE_YAMAP_API_KEY
ENV VITE_BACK_URL $VITE_BACK_URL
WORKDIR /app
COPY package*.json .
RUN npm i
RUN echo $PATH
COPY . .
RUN npm run build