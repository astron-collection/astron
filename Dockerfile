# Use Node.js 18 LTS as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including pm2 globally
RUN npm ci --only=production && npm install -g pm2

# Copy application code
COPY . .

# Create logs directory for winston
RUN mkdir -p logs

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port (if needed for health checks)
EXPOSE 3000

# Health check using pm2 status
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD pm2 list | grep -q "online" || exit 1

# Start the bot with pm2 in ecosystem mode
CMD ["pm2-runtime", "start", "server.js", "--name", "astron-bot", "--log-date-format", "YYYY-MM-DD HH:mm:ss Z", "--env", "production"]