FROM node:18-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk update && apk upgrade
RUN apk add git
# Install app dependencies
ENV HOST='0.0.0.0'
ENV PORT='3000'

COPY package*.json ./

RUN npm install

# Bundle app source

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]

