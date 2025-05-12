import { Content } from '../Content';
import { ValidationError } from '../../errors/DomainError';

describe('Content Value Object', () => {
  describe('constructor', () => {
    it('should create valid content', () => {
      const content = new Content('Test content');
      expect(content.getValue()).toBe('Test content');
    });

    it('should throw ValidationError for empty content', () => {
      expect(() => {
        new Content('');
      }).toThrow(new ValidationError('Content cannot be empty'));
    });

    it('should throw ValidationError for content with only whitespace', () => {
      expect(() => {
        new Content('   ');
      }).toThrow(new ValidationError('Content cannot be empty'));
    });

    it('should throw ValidationError for content longer than 10000 characters', () => {
      const longContent = 'a'.repeat(10001);
      expect(() => {
        new Content(longContent);
      }).toThrow(new ValidationError('Content must be at most 10000 characters long'));
    });

    it('should trim whitespace from content', () => {
      const content = new Content('  Test content  ');
      expect(content.getValue()).toBe('Test content');
    });
  });

  describe('equals', () => {
    it('should return true for same content', () => {
      const content1 = new Content('Test content');
      const content2 = new Content('Test content');
      expect(content1.equals(content2)).toBe(true);
    });

    it('should return false for different content', () => {
      const content1 = new Content('Test content 1');
      const content2 = new Content('Test content 2');
      expect(content1.equals(content2)).toBe(false);
    });

    it('should return false when comparing with null', () => {
      const content = new Content('Test content');
      expect(content.equals(null as unknown as Content)).toBe(false);
    });
  });
}); 