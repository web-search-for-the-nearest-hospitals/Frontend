FROM node:lts-bookworm-slim as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN --mount=type=secret,id=VITE_NODE_ENV \
    --mount=type=secret,id=VITE_YAMAP_API_KEY \
    --mount=type=secret,id=VITE_BACK_URL \
    echo "VITE_NODE_ENV=$(cat /run/secrets/VITE_NODE_ENV)" > .env && \
    echo "VITE_YAMAP_API_KEY=$(cat /run/secrets/VITE_YAMAP_API_KEY)" >> .env && \
    echo "VITE_BACK_URL=$(cat /run/secrets/VITE_BACK_URL)" >> .env
RUN npm run build