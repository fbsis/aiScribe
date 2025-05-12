#!/bin/bash

# Wait for MinIO to be ready
until curl -s http://minio:9000/minio/health/live; do
  echo "Waiting for MinIO to be ready..."
  sleep 2
done

# Install MinIO client
wget https://dl.min.io/client/mc/release/linux-amd64/mc -O /usr/local/bin/mc
chmod +x /usr/local/bin/mc

# Create bucket and set policy
mc alias set myminio http://minio:9000 minioadmin minioadmin
mc mb myminio/medical-notes --ignore-existing

# Set bucket policy to public
mc policy set download myminio/medical-notes

echo "✅ MinIO bucket 'medical-notes' created and set to public" 