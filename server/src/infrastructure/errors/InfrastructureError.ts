export class InfrastructureError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = 'InfrastructureError';
  }
}

export class DatabaseError extends InfrastructureError {
  constructor(message: string) {
    super(message, 'DATABASE_ERROR', 500);
    this.name = 'DatabaseError';
  }
}

export class StorageError extends InfrastructureError {
  constructor(message: string) {
    super(message, 'STORAGE_ERROR', 500);
    this.name = 'StorageError';
  }
}

export class ExternalServiceError extends InfrastructureError {
  constructor(message: string) {
    super(message, 'EXTERNAL_SERVICE_ERROR', 503);
    this.name = 'ExternalServiceError';
  }
} 