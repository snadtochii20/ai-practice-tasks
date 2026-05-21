FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm install

FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --omit=dev

COPY src ./src

EXPOSE 3000

USER node

CMD ["node", "src/app.js"]