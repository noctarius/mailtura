#!/bin/sh

echo "Running migrations, if required..."
cd /opt
bun install prisma@7.2.0
bunx prisma@7.2.0 migrate deploy --config ./prisma.config.ts --schema=./prisma/schema.prisma
