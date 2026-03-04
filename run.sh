#!/bin/bash

set -e

source .env

case "$1" in
  build)
    docker build . -t red-tetris
    ;;
  terminal)
    docker run --rm -e PUBLIC_SERVER_PORT=${PUBLIC_SERVER_PORT} -e PUBLIC_SERVER_ADDRESS=${PUBLIC_SERVER_ADDRESS} -p ${PUBLIC_SERVER_PORT}:${PUBLIC_SERVER_PORT} -it red-tetris /bin/bash
    ;;
  *)
    echo "Usage: ./bash cli.sh <build/terminal>
    build: build the docker image
    terminal: spawn inside the docker"
    ;;
esac
