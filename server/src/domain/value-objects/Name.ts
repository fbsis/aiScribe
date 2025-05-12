import { ValidationError } from '../errors/DomainError';

export class Name {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
    this.validate();
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new ValidationError('Name cannot be empty');
    }

    if(this.value.length < 2) {
      throw new ValidationError('Name must be at least 2 characters long');
    }

    if (this.value.length > 100) {
      throw new ValidationError('Name cannot be longer than 100 characters');
    }
  }

  public getValue(): string {
    return this.value.trim();
  }

  public equals(other: Name): boolean {
    if (!other) {
      return false;
    }
    return this.value === other.value;
  }
} 