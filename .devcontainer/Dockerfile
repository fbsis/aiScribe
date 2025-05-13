FROM node:20

# Install system dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    curl \
    git \
    procps \
    lsb-release \
    postgresql-client \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install global npm packages
RUN npm install -g npm@latest

# Set working directory
WORKDIR /workspace

# Set environment variables
ENV NODE_ENV=development 