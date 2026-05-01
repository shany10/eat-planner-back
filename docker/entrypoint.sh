#!/usr/bin/env sh
set -e

echo "[entrypoint] Running Prisma migrations..."
# `deploy` est fait pour les environnements container/CI
npx prisma migrate deploy
npx prisma generate

echo "[entrypoint] Starting app..."
exec npm run dev
