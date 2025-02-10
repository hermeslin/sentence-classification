FROM node:20-slim

ARG HTTP_PORT

WORKDIR /workspace
COPY package*.json ./

RUN npm ci --only=production

# Copy local code to the container image.
COPY ./src ./src

EXPOSE $HTTP_PORT

# Run the web service on container startup.
ENTRYPOINT [ "node", "src/index.js" ]