FROM node:22-alpine3.18

WORKDIR /app/

COPY package*.json /app/

RUN npm install --production

COPY . /app/

EXPOSE $PORT

CMD ["node", "index.js"]