import { Name } from '../Name';
import { ValidationError } from '../../errors/DomainError';

describe('Name Value Object', () => {
  describe('constructor', () => {
    it('should create a valid name', () => {
      const name = new Name('John Doe');
      expect(name.getValue()).toBe('John Doe');
    });

    it('should throw ValidationError for empty name', () => {
      expect(() => {
        new Name('');
      }).toThrow(new ValidationError('Name cannot be empty'));
    });

    it('should throw ValidationError for name with only whitespace', () => {
      expect(() => {
        new Name('   ');
      }).toThrow(new ValidationError('Name cannot be empty'));
    });

    it('should throw ValidationError for name shorter than 2 characters', () => {
      expect(() => {
        new Name('J');
      }).toThrow(new ValidationError('Name must be at least 2 characters long'));
    });

    it('should throw ValidationError for name longer than 100 characters', () => {
      const longName = 'J'.repeat(101);
      expect(() => {
        new Name(longName);
      }).toThrow(new ValidationError('Name cannot be longer than 100 characters'));
    });

    it('should trim whitespace from name', () => {
      const name = new Name('  John Doe  ');
      expect(name.getValue()).toBe('John Doe');
    });
  });

  describe('equals', () => {
    it('should return true for same name', () => {
      const name1 = new Name('John Doe');
      const name2 = new Name('John Doe');
      expect(name1.equals(name2)).toBe(true);
    });

    it('should return false for different names', () => {
      const name1 = new Name('John Doe');
      const name2 = new Name('Jane Doe');
      expect(name1.equals(name2)).toBe(false);
    });

    it('should return false when comparing with null', () => {
      const name = new Name('John Doe');
      // @ts-ignore
      expect(name.equals(null)).toBe(false);
    });
  });
}); 