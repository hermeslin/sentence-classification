## Building for runtime stage
FROM python:3-slim AS builder

RUN apt update
# `curl` for get nvm to use
# `build-essential` for rebuild:tsjs to use
RUN apt install -y curl build-essential

WORKDIR /workspace
COPY package*.json ./

## Install node js in python builder
# Use bash for the shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Create a script file sourced by both interactive and non-interactive bash shells
ENV BASH_ENV=/root/.bash_env
RUN touch "${BASH_ENV}"
RUN echo '. "${BASH_ENV}"' >> ~/.bashrc

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | PROFILE="${BASH_ENV}" bash
RUN echo node > .nvmrc
RUN nvm install 20

# npm clean install and rebuild tensorflow-node
RUN npm ci --only=production
RUN npm run rebuild:tsjs

## runtime stage
FROM node:20-slim
ARG HTTP_PORT

WORKDIR /workspace

# copy node_modules and rebuilded tesorflow-node
COPY --from=builder "/workspace" "/workspace"
COPY ./src ./src

EXPOSE $HTTP_PORT

# Run the web service on container startup.
ENTRYPOINT [ "node", "src/index.js" ]