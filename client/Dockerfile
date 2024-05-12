FROM node:22-alpine3.18 AS build

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.25.5-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


