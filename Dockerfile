# Multi-stage build for Livora Backend

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY infrastructure/package.json ./infrastructure/
COPY backend/package.json ./backend/
COPY packages/ ./packages/

# Install dependencies
RUN npm install

# Build all workspaces
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy only necessary files from builder
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/package*.json ./backend/
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules ./node_modules

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Use dumb-init to handle signals
ENTRYPOINT ["dumb-init", "--"]

# Start backend
CMD ["node", "backend/dist/index.js"]

EXPOSE 3000

LABEL org.opencontainers.image.title="Livora Enterprise Engine"
LABEL org.opencontainers.image.description="Backend service for Livora Enterprise Intelligence and Automation Engine"
LABEL org.opencontainers.image.version="0.1.0"