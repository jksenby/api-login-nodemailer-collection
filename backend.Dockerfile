FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm install -g --force nodemon

EXPOSE 3000

CMD ["nodemon", "server.js"]