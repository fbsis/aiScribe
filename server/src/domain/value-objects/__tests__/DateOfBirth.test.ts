import { DateOfBirth } from '../DateOfBirth';
import { ValidationError } from '../../errors/DomainError';

describe('DateOfBirth Value Object', () => {
  describe('constructor', () => {
    it('should create a valid date of birth', () => {
      const dob = new DateOfBirth(new Date('1990-01-01'));
      expect(dob.getValue()).toEqual(new Date('1990-01-01'));
    });

    it('should throw ValidationError for future date', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      expect(() => {
        new DateOfBirth(tomorrow);
      }).toThrow(new ValidationError('Date of birth cannot be in the future'));
    });

    it('should throw ValidationError for date more than 150 years ago', () => {
      const oldDate = new Date();
      oldDate.setFullYear(oldDate.getFullYear() - 151);

      expect(() => {
        new DateOfBirth(oldDate);
      }).toThrow(new ValidationError('Date of birth cannot be more than 150 years ago'));
    });
  });

  describe('getAge', () => {
    it('should calculate correct age', () => {
      const today = new Date();
      const birthDate = new Date(today.getFullYear() - 30, today.getMonth(), today.getDate());
      const dob = new DateOfBirth(birthDate);

      expect(dob.getAge()).toBe(30);
    });

    it('should calculate age correctly when birthday has not occurred this year', () => {
      const today = new Date();
      const birthDate = new Date(today.getFullYear() - 30, today.getMonth() + 1, today.getDate());
      const dob = new DateOfBirth(birthDate);

      expect(dob.getAge()).toBe(29);
    });

    it('should calculate age correctly when birthday has occurred this year', () => {
      const today = new Date();
      const birthDate = new Date(today.getFullYear() - 30, today.getMonth() - 1, today.getDate());
      const dob = new DateOfBirth(birthDate);

      expect(dob.getAge()).toBe(30);
    });
  });

  describe('equals', () => {
    it('should return true for same date', () => {
      const date = new Date('1990-01-01');
      const dob1 = new DateOfBirth(date);
      const dob2 = new DateOfBirth(new Date(date));

      expect(dob1.equals(dob2)).toBe(true);
    });

    it('should return false for different dates', () => {
      const dob1 = new DateOfBirth(new Date('1990-01-01'));
      const dob2 = new DateOfBirth(new Date('1991-01-01'));

      expect(dob1.equals(dob2)).toBe(false);
    });

  });
}); 