FROM node:lts-bookworm-slim as build
RUN --mount=type=secret,id=VITE_NODE_ENV \
  --mount=type=secret,id=VITE_YAMAP_API_KEY \
  --mount=type=secret,id=VITE_BACK_URL \
   export VITE_NODE_ENV=$(cat /run/secrets/VITE_NODE_ENV) && \
   export VITE_YAMAP_API_KEY=$(cat /run/secrets/VITE_YAMAP_API_KEY) && \
   export VITE_BACK_URL=$(cat /run/secrets/VITE_BACK_URL) && \
   echo $VITE_NODE_ENV \
   echo $VITE_YAMAP_API_KEY \
   echo $VITE_BACK_URL \
   touch .env \
   echo VITE_NODE_ENV=$VITE_NODE_ENV >> .env \
   echo VITE_YAMAP_API_KEY=$VITE_YAMAP_API_KEY >> .env \
   echo VITE_BACK_URL=$VITE_BACK_URL >> .env \
   cat .env
#RUN --mount=type=secret,id=VITE_BACK_URL \
#   export VITE_BACK_URL=$(cat /run/secrets/VITE_BACK_URL) && \
#   echo $VITE_BACK_URL
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . .
RUN npm run build
