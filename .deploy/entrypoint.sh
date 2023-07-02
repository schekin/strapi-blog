#!/bin/bash
set -e

source .env
ls -la
cat /env/.env

export ENV_PATH="/env/.env"

exec "$@"