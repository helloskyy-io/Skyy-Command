# Stage 1: Build Angular Application
FROM node:18 AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build -- --configuration=production

# Stage 2: Serve Angular App Locally
FROM node:18
WORKDIR /app
COPY --from=build /app/dist/skyy-command/browser /app
RUN npm install -g http-server
EXPOSE 666
CMD ["http-server", "-p", "666", "-a", "127.0.0.1", "-s"]


# Stage 3: Serve Angular App with Nginx
# FROM nginx:alpine
# COPY --from=build /app/dist/my-angular-app /usr/share/nginx/html
# COPY nginx/nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
