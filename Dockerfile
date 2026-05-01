FROM node:22-bookworm-slim

WORKDIR /app

# Prisma (et certains clients DB) a besoin d'OpenSSL dans l'image runtime.
RUN apt-get update -y \
	&& apt-get install -y --no-install-recommends openssl ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci
COPY --chown=node:node . .

USER node

EXPOSE 3000
CMD ["npm", "run", "dev"]