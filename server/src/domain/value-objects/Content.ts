import { ValidationError } from '../errors/DomainError';

export class Content {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
    this.validate();
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new ValidationError('Content cannot be empty');
    }

    if (this.value.length > 10000) {
      throw new ValidationError('Content must be at most 10000 characters long');
    }
  }

  public getValue(): string {
    return this.value.trim();
  }

  public equals(other: Content): boolean {
    if (!other) {
      return false;
    }
    return this.value === other.value;
  }
} 