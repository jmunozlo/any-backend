FROM alpine:3.15

RUN apk add --update yarn 

WORKDIR /app

COPY package.json .

RUN yarn 

COPY . .

RUN yarn build

EXPOSE 4000 

CMD ["yarn", "start"]