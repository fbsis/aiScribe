# Medical Notes System Architecture

## Documentation Links

- [Architecture Overview](architecture.md) - Detailed system architecture, components, and technical decisions
- [Project Planning](planning.md) - Project roadmap, milestones, and development phases

## Requirements

### System Requirements
- Node.js >= 18.x
- Docker and Docker Compose
- AWS Account (for production deployment)
- MinIO Server (for file storage)
- Redis (for BullMQ queue)
- VS Code with Remote - Containers extension
- Docker Desktop
- Git

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# Application
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/medical_notes

# MinIO Configuration
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=your_access_key
MINIO_SECRET_KEY=your_secret_key
MINIO_BUCKET_NAME=medical-notes

# Redis (for BullMQ)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# AWS Configuration (for production)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```

## Local Development Setup

The easiest way to run the application locally is using VS Code's devcontainer, which provides a pre-configured development environment with all necessary dependencies.

1. Clone the repository:
```bash
git clone <repository-url>
cd medical-notes
```

2. Open the project in VS Code:
```bash
code .
```

3. When prompted, click "Reopen in Container" or use the command palette (F1) and select "Remote-Containers: Reopen in Container"

The devcontainer will:
- Set up all required dependencies (Node.js, npm, etc.)
- Start all necessary services (PostgreSQL, Redis, MinIO)
- Configure the development environment
- Install all project dependencies

Once the container is built and running, you can:

1. Run database migrations:
```bash
npm run migrate
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Manual Setup (Alternative)

If you prefer not to use devcontainer, you can follow these steps:

1. Clone the repository:
```bash
git clone <repository-url>
cd medical-notes
```

2. Install dependencies:
```bash
npm install
```

3. Start the required services using Docker Compose:
```bash
docker-compose up -d
```
This will start:
- PostgreSQL database
- Redis server
- MinIO server

4. Run database migrations:
```bash
npm run migrate
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## AWS Deployment

### Prerequisites
- AWS CLI installed and configured
- AWS ECS CLI installed
- Docker installed locally
- AWS ECR repository created

### Infrastructure Setup

1. Create an ECS cluster:
```bash
aws ecs create-cluster --cluster-name medical-notes-cluster
```

2. Create an ECR repository:
```bash
aws ecr create-repository --repository-name medical-notes
```

3. Set up MinIO on AWS:
   - Create an EC2 instance for MinIO
   - Configure security groups to allow access on port 9000
   - Install MinIO server on the EC2 instance
   - Configure MinIO with persistent storage using EBS volumes

4. Set up Redis on AWS:
   - Use AWS ElastiCache for Redis
   - Create a Redis cluster with appropriate node type
   - Configure security groups for Redis access

### Deployment Steps

1. Build and tag the Docker image:
```bash
docker build -t medical-notes .
docker tag medical-notes:latest <aws-account-id>.dkr.ecr.<region>.amazonaws.com/medical-notes:latest
```

2. Push the image to ECR:
```bash
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws-account-id>.dkr.ecr.<region>.amazonaws.com
docker push <aws-account-id>.dkr.ecr.<region>.amazonaws.com/medical-notes:latest
```

3. Create an ECS task definition:
```json
{
  "family": "medical-notes",
  "containerDefinitions": [
    {
      "name": "medical-notes",
      "image": "<aws-account-id>.dkr.ecr.<region>.amazonaws.com/medical-notes:latest",
      "memory": 512,
      "cpu": 256,
      "essential": true,
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:ssm:<region>:<account-id>:parameter/medical-notes/database-url"
        }
      ]
    }
  ]
}
```

4. Create an ECS service:
```bash
aws ecs create-service \
  --cluster medical-notes-cluster \
  --service-name medical-notes-service \
  --task-definition medical-notes:1 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxx],securityGroups=[sg-xxxxx],assignPublicIp=ENABLED}"
```

### Monitoring and Maintenance

1. Set up CloudWatch alarms for:
   - CPU utilization
   - Memory utilization
   - Error rates
   - Queue length (BullMQ)

2. Configure CloudWatch Logs for application logs

3. Set up AWS Backup for MinIO data

4. Configure auto-scaling based on CPU and memory utilization

## Troubleshooting

### Common Issues

1. MinIO Connection Issues:
   - Verify MinIO endpoint and credentials
   - Check security group settings
   - Ensure bucket exists and is accessible

2. BullMQ Queue Issues:
   - Verify Redis connection
   - Check queue configuration
   - Monitor queue metrics in CloudWatch

3. Database Connection Issues:
   - Verify database credentials
   - Check network connectivity
   - Ensure database is running

For more detailed troubleshooting, check the logs in CloudWatch or contact the development team.
