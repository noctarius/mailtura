#!/usr/bin/env sh

set -e

cd /opt/app

echo "Running migrations, if required..."
bunx prisma migrate deploy

echo "Starting server..."
bun run './index.js'
