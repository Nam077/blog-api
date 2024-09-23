# Stage 1: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run the app
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Install dotenv
RUN npm install dotenv

# Expose the application port
EXPOSE ${APP_PORT}

# Use environment variables from Docker
CMD ["npm", "run", "start:prod"]
