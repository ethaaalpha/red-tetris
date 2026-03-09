FROM oven/bun:1.3.10 AS front_builder

WORKDIR /app
COPY package.json bun.lock ./
COPY client/ client/
COPY shared/ shared/

WORKDIR /app/client
RUN bun install
RUN bun run build


FROM oven/bun:1.3.10 AS runner

WORKDIR /app

COPY --from=front_builder /app/client/build/ server/sveltekit-build/

COPY shared/ shared/
COPY server/ server/

ARG SERVER_PORT
ENV SERVER_PORT=${SERVER_PORT}

WORKDIR /app/shared
RUN bun install --production

WORKDIR /app/server
RUN bun install --production

CMD ["bun", "run", "server"]
