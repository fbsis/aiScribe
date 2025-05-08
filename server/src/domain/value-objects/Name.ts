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
  }

  public getValue(): string {
    return this.value.trim();
  }

  public equals(other: Name): boolean {
    return this.value === other.value;
  }
} 