#!/usr/bin/env sh

set -e

echo "Running migrations, if required..."
cd /opt/app/node_modules/@mailtura/database
bunx prisma@7.1.0 migrate deploy --config ./prisma/prisma.config.ts --schema=./prisma/schema.prisma
cd /opt/app

echo "Starting server..."
bun run './index.js'
