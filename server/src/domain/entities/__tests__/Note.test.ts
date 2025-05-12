import { Note } from '../Note';
import { AudioFile } from '../AudioFile';
import { Content } from '../../value-objects/Content';
import { AudioFileValue } from '../../value-objects/AudioFile';
import { ValidationError } from '../../errors/DomainError';

describe('Note Entity', () => {
  let mockNote: Note;
  const mockContent = new Content('Test note content');
  const mockCreatedAt = new Date('2024-01-01');
  const mockUpdatedAt = new Date('2024-01-01');

  beforeEach(() => {
    mockNote = new Note(
      'note1',
      'patient1',
      mockContent,
      'Test summary',
      undefined,
      mockCreatedAt,
      mockUpdatedAt
    );
  });

  describe('constructor', () => {
    it('should create a note with valid data', () => {
      expect(mockNote.id).toBe('note1');
      expect(mockNote.patientId).toBe('patient1');
      expect(mockNote.getContent()).toBe(mockContent);
      expect(mockNote.getSummary()).toBe('Test summary');
      expect(mockNote.getAudioFile()).toBeUndefined();
      expect(mockNote.createdAt).toEqual(mockCreatedAt);
      expect(mockNote.getUpdatedAt()).toEqual(mockUpdatedAt);
    });

    it('should throw ValidationError for empty id', () => {
      expect(() => {
        new Note('', 'patient1', mockContent, 'Test summary');
      }).toThrow(new ValidationError('Note ID is required'));
    });

    it('should throw ValidationError for empty patient id', () => {
      expect(() => {
        new Note('note1', '', mockContent, 'Test summary');
      }).toThrow(new ValidationError('Patient ID is required'));
    });

    it('should create note with current timestamps when not provided', () => {
      const note = new Note('note1', 'patient1', mockContent, 'Test summary');
      expect(note.createdAt).toBeInstanceOf(Date);
      expect(note.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should accept undefined summary', () => {
      const note = new Note('note1', 'patient1', mockContent);
      expect(note.getSummary()).toBeUndefined();
    });
  });

  describe('updateContent', () => {
    it('should update note content', () => {
      const newContent = new Content('Updated content');
      mockNote.updateContent(newContent);
      expect(mockNote.getContent()).toBe(newContent);
      expect(mockNote.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should throw ValidationError for empty content', () => {
      expect(() => {
        mockNote.updateContent(new Content(''));
      }).toThrow(new ValidationError('Content cannot be empty'));
    });
  });

  describe('updateSummary', () => {
    it('should update note summary', () => {
      const newSummary = 'Updated summary';
      mockNote.updateSummary(newSummary);
      expect(mockNote.getSummary()).toBe(newSummary);
      expect(mockNote.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should accept undefined summary', () => {
      mockNote.updateSummary('');
      expect(mockNote.getSummary()).toBe('');
    });
  });

  describe('attachAudioFile', () => {
    it('should attach audio file to note', () => {
      const audioFileValue = new AudioFileValue(
        '/path/to/audio.mp3',
        120,
        'https://example.com/audio.mp3'
      );

      const audioFile = new AudioFile('audio1', 'note1', audioFileValue);
      mockNote.attachAudioFile(audioFile);
      expect(mockNote.getAudioFile()).toBe(audioFile);
      expect(mockNote.getUpdatedAt()).toBeInstanceOf(Date);
    });
  });

  describe('removeAudioFile', () => {
    it('should remove audio file from note', () => {
      const audioFileValue = new AudioFileValue(
        '/path/to/audio.mp3',
        120,
        'https://example.com/audio.mp3'
      );

      const audioFile = new AudioFile('audio1', 'note1', audioFileValue);
      mockNote.attachAudioFile(audioFile);
      expect(mockNote.getAudioFile()).toBe(audioFile);

      mockNote.removeAudioFile();
      expect(mockNote.getAudioFile()).toBeUndefined();
      expect(mockNote.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should not throw error when removing non-existent audio file', () => {
      expect(() => {
        mockNote.removeAudioFile();
      }).not.toThrow();
    });
  });

  describe('toJSON', () => {
    it('should convert note to JSON format', () => {
      const json = mockNote.toJSON();

      expect(json).toEqual({
        id: 'note1',
        patientId: 'patient1',
        content: mockContent.getValue(),
        summary: 'Test summary',
        audioFile: undefined,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      });
    });

    it('should include audio file in JSON when present', () => {
      const audioFileValue = new AudioFileValue(
        '/path/to/audio.mp3',
        120,
        'https://example.com/audio.mp3'
      );

      const audioFile = new AudioFile('audio1', 'note1', audioFileValue);
      mockNote.attachAudioFile(audioFile);
      const json = mockNote.toJSON();

      expect(json).toEqual({
        id: 'note1',
        patientId: 'patient1',
        content: mockContent.getValue(),
        summary: 'Test summary',
        audioFile: audioFile.toJSON(),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      });
    });
  });
}); 