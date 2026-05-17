#!/usr/bin/env sh
set -e

if [ ! -x ./node_modules/.bin/prisma ]; then
	echo "[entrypoint] Installing npm dependencies (node_modules volume is empty/missing)..."
	npm ci
fi

echo "[entrypoint] Running Prisma migrations..."
# `deploy` est fait pour les environnements container/CI
npx --no-install prisma migrate deploy
npx --no-install prisma generate

echo "[entrypoint] Starting app..."
exec npm run dev
