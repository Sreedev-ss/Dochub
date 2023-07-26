FROM node:18-alpine as BUILD_IMAGE

WORKDIR /app

COPY  package*.json ./

RUN npm install --force

COPY . .

RUN npm run build


FROM node:18-alpine

WORKDIR /app

COPY --from=BUILD_IMAGE /app/dist/ /app/dist/

EXPOSE 5174

COPY package.json .
COPY vite.config.ts .

RUN npm install typescript --force
EXPOSE 5174

CMD [ "npm","run","preview" ]



