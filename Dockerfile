FROM node:lts-bookworm-slim as build
RUN --mount=type=secret,id=VITE_NODE_ENV \
  --mount=type=secret,id=VITE_YAMAP_API_KEY \
  --mount=type=secret,id=VITE_BACK_URL \
   export VITE_NODE_ENV=$(cat /run/secrets/vite_node_env) && \
   export VITE_YAMAP_API_KEY=$(cat /run/secrets/vite_yamap_api_key) && \
   export VITE_BACK_URL=$(cat /run/secrets/vite_back_url) && \
   echo VITE_NODE_ENV \
   echo VITE_YAMAP_API_KEY \
   echo VITE_BACK_URL
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . .
RUN npm run build