#!/bin/ash
set -e

export_env_variables() {
    cat /env/.env | awk -F'=' '/^[^data:|^metadata:]/ { print $0 }' | while IFS= read -r line; do
        export "$line"
    done
}

export_env_variables

exec "$@"
