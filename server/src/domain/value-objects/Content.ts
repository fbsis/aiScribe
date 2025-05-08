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
  }

  public getValue(): string {
    return this.value.trim();
  }

  public equals(other: Content): boolean {
    return this.value === other.value;
  }
} 