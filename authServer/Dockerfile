FROM node:18-alpine

WORKDIR /app

COPY  package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=8001

EXPOSE 8001

CMD [ "npm","start" ]



