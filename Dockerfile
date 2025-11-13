# Use official Node.js runtime
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm (since you have pnpm-lock.yaml)
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy all source code
COPY . .

# Build the Next.js app
RUN pnpm run build

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]