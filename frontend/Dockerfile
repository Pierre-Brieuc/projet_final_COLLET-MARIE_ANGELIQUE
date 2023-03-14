# Declaration of the base image to use
FROM node:18-alpine

# Create app directory
RUN mkdir -p /usr/src/app

# Set working directory
WORKDIR /usr/src/app

# Update packages and install git
RUN apk update && apk upgrade
RUN apk add git

# Set environment variables
ENV HOST='0.0.0.0'
ENV PORT='3000'
# Copy package.json and package-lock.json for dependencies
COPY package*.json ./
# Install app dependencies
RUN npm install


# Copy the rest of the sources
COPY . .
# Build the app
RUN npm run build
# Expose the port for the frontend
EXPOSE 3000
# Run the app
CMD ["node", ".output/server/index.mjs"]

