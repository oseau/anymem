FROM node:20-bookworm

# install rsync
RUN apt-get update && apt-get install -y rsync

WORKDIR /usr/src/anymem/web
ENV NEXT_TELEMETRY_DISABLED 1
