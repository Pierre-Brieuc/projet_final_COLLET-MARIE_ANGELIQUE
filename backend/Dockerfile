# Node image to use
FROM node:18-alpine

# Working environment in which the app will be run
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copies all the dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

COPY . .

# The container will be available in the port 5000
EXPOSE 5000

CMD [ "node", "index.js" ]
