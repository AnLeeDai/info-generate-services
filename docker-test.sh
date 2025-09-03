#!/bin/bash

# Build Docker image
echo "Building Docker image..."
docker build -t info-generate-services .

# Run container locally for testing
echo "Running container locally on port 3000..."
docker run -p 3000:10000 -e PORT=10000 info-generate-services
