#!/bin/bash

# Exit on error
set -e

# Define variables
FRONTEND_DIR="./frontend"
DIST_DIR="./frontend/dist"
IMAGE_NAME="skyy-command"
CONTAINER_NAME="skyy-command"
HOST_PORT=8080
CONTAINER_PORT=80

# Build the PROD Angular files
echo "Building Angular production files..."
cd "$FRONTEND_DIR"
npm install
ng build --configuration=production
cd -

# Stop and remove all containers using the 'skyy-command' image
echo "Stopping and removing all containers based on the $IMAGE_NAME image..."
docker ps -aq --filter "ancestor=$IMAGE_NAME" | xargs -r docker rm -f

# Remove old images for 'skyy-command'
echo "Removing old images for $IMAGE_NAME..."
docker images -q "$IMAGE_NAME" | xargs -r docker rmi -f

# Clean up dangling Docker resources
echo "Cleaning up unused Docker resources..."
docker system prune -f --volumes

# Build the new Docker image
echo "Building new Docker image..."
docker build -t "$IMAGE_NAME" .

# Run the new container with the specified name
echo "Running new Docker container named $CONTAINER_NAME..."
docker run -d --name "$CONTAINER_NAME" -p $HOST_PORT:$CONTAINER_PORT "$IMAGE_NAME"

echo "Container is running at: http://localhost:$HOST_PORT"

