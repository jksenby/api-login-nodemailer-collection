FROM node:22-alpine AS builder

WORKDIR /app

RUN npm install -g @angular/cli@19.1.4

COPY package*.json ./

RUN npm install --force

COPY . .

RUN ng build --configuration production

FROM nginx:alpine

COPY --from=builder /app/dist/superapp/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]