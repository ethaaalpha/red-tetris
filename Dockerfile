FROM oven/bun:1.3.10 AS builder

WORKDIR /app
COPY . .

RUN bun install
RUN bun run build


FROM oven/bun:1.3.10 AS runner

WORKDIR /app

COPY --from=builder /app/client/build sveltekit-build
COPY --from=builder /app/server/app.js app.js

ARG SERVER_PORT
ENV SERVER_PORT=${SERVER_PORT}

CMD ["bun", "app.js"]
