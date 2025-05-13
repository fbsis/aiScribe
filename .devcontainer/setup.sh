#!/bin/bash

# Install global dependencies
echo "📦 Installing global dependencies..."
npm install -g concurrently

# Setup server
echo "🚀 Setting up server..."
cd server
npm install

# Setup client
echo "🎨 Setting up client..."
cd ../client
npm install

# Return to root and start development servers
echo "✨ Starting development servers..."
cd ..
concurrently \
  "cd server && npm run dev" \
  "cd client && npm run dev" 