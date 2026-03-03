FROM node:25-alpine3.22

RUN apk add --no-cache curl bash
RUN curl -fsSL https://bun.com/install | bash

ENV BUN_INSTALL="/root/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

WORKDIR  /app
COPY . .

RUN bun install --no-cache
RUN npm run build
