#!/usr/bin/env sh

set -e
cd /opt/app
echo "Starting server..."
bun run './index.js'
