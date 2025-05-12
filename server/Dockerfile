FROM node:20-alpine

# Install OpenSSL 3.0.x
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 3001

# run seed
RUN npm run seed

# Start the application
CMD ["npm", "run", "dev"] 