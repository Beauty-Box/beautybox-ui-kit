FROM node:16.13.2-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
