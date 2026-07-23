# frontend/Dockerfile

# --- Stage 1: Build ---
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# VITE_ vars are baked into the bundle at build time
ARG VITE_API_BASE_URL=http://localhost:8000
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

# --- Stage 2: Serve ---
FROM nginx:alpine

# Copy built files into nginx's default public folder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80