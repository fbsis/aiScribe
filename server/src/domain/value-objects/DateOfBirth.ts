import { ValidationError, BusinessRuleError } from '../errors/DomainError';

export class DateOfBirth {
  private readonly value: Date;

  constructor(value: Date) {
    this.value = value;
    this.validate();
  }

  private validate(): void {
    if (!this.value || isNaN(this.value.getTime())) {
      throw new ValidationError('Invalid date of birth');
    }

    const today = new Date();
    if (this.value > today) {
      throw new BusinessRuleError('Date of birth cannot be in the future');
    }
  }

  public getValue(): Date {
    return this.value;
  }

  public getAge(): number {
    const today = new Date();
    let age = today.getFullYear() - this.value.getFullYear();
    const monthDiff = today.getMonth() - this.value.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < this.value.getDate())) {
      age--;
    }
    
    return age;
  }

  public equals(other: DateOfBirth): boolean {
    return this.value.getTime() === other.value.getTime();
  }
} 