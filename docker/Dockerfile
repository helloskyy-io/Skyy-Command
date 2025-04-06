
### Stage 1 ### 
# CI to automate the creation of the PROD files from Angular
# fill me in later


### Stage 2 ###
# # Serve Pre-Built Angular App
# FROM node:18

# # Set working directory for serving the app
# WORKDIR /app

# # Copy pre-built production files into the container
# COPY frontend/dist/skyy-command/browser /app

# # Install lightweight HTTP server
# RUN npm install -g http-server

# # Expose port for local access
# EXPOSE 80

# # Serve the app locally
# CMD ["http-server", "/app", "-p", "80", "-a", "0.0.0.0", "-s"]


### Stage 3 ###
# add in Nginx functionality
# Serve Pre-Built Angular App with Nginx
FROM nginx:alpine

# Set working directory for Nginx
WORKDIR /usr/share/nginx/html

# Copy pre-built production files into Nginx's default static file directory
COPY frontend/dist/skyy-command/browser /usr/share/nginx/html

# Copy custom Nginx configuration file (optional)
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expose port for web access
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]


