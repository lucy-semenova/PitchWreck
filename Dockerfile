# Build frontend
FROM node:20-alpine AS frontend-build

WORKDIR /app

COPY app/package*.json ./app/
WORKDIR /app/app
RUN npm install

COPY app/ ./
RUN npm run build


# Build backend
FROM node:20-alpine

WORKDIR /app

COPY api/package*.json ./api/
WORKDIR /app/api
RUN npm install --omit=dev

COPY api/ ./

# Copy React build into Express public folder
COPY --from=frontend-build /app/app/dist ./public

ENV NODE_ENV=production

EXPOSE 3001

CMD ["npm", "start"]