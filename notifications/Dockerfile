FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY src/ ./src

CMD ["node", "src/app.js"]
