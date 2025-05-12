import { Patient } from '../Patient';
import { Note } from '../Note';
import { Name } from '../../value-objects/Name';
import { DateOfBirth } from '../../value-objects/DateOfBirth';
import { Content } from '../../value-objects/Content';
import { ValidationError } from '../../errors/DomainError';

describe('Patient Entity', () => {
  let mockPatient: Patient;
  const mockName = new Name('John Doe');
  const mockDob = new DateOfBirth(new Date('1990-01-01'));
  const mockCreatedAt = new Date('2024-01-01');
  const mockUpdatedAt = new Date('2024-01-01');

  beforeEach(() => {
    mockPatient = new Patient(
      '123',
      mockName,
      mockDob,
      [],
      mockCreatedAt,
      mockUpdatedAt
    );
  });

  describe('constructor', () => {
    it('should create a patient with valid data', () => {
      expect(mockPatient.id).toBe('123');
      expect(mockPatient.getName()).toBe(mockName);
      expect(mockPatient.getDob()).toBe(mockDob);
      expect(mockPatient.getNotes()).toEqual([]);
      expect(mockPatient.createdAt).toEqual(mockCreatedAt);
      expect(mockPatient.getUpdatedAt()).toEqual(mockUpdatedAt);
    });

    
    it('should create patient with current timestamps when not provided', () => {
      const patient = new Patient('123', mockName, mockDob);
      expect(patient.createdAt).toBeInstanceOf(Date);
      expect(patient.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should initialize with empty notes array when not provided', () => {
      const patient = new Patient('123', mockName, mockDob);
      expect(patient.getNotes()).toEqual([]);
    });
  });

  describe('addNote', () => {
    it('should add a note to the patient', () => {
      const note = new Note(
        'note1',
        mockPatient.id,
        new Content('Test note'),
        'Test summary',
        undefined,
        mockCreatedAt,
        mockUpdatedAt
      );

      mockPatient.addNote(note);
      const notes = mockPatient.getNotes();
      expect(notes).toHaveLength(1);
      expect(notes[0]).toBe(note);
      expect(mockPatient.getUpdatedAt()).toBeInstanceOf(Date);
    });



  });

  describe('removeNote', () => {
    it('should remove a note from the patient', () => {
      const note = new Note(
        'note1',
        mockPatient.id,
        new Content('Test note'),
        'Test summary',
        undefined,
        mockCreatedAt,
        mockUpdatedAt
      );

      mockPatient.addNote(note);
      expect(mockPatient.getNotes()).toHaveLength(1);

      mockPatient.removeNote(note.id);
      expect(mockPatient.getNotes()).toHaveLength(0);
      expect(mockPatient.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should not throw error when removing non-existent note', () => {
      expect(() => {
        mockPatient.removeNote('non-existent-note');
      }).not.toThrow();
    });

    it('should update the updatedAt timestamp when removing a note', () => {
      const note = new Note(
        'note1',
        mockPatient.id,
        new Content('Test note'),
        'Test summary',
        undefined,
        mockCreatedAt,
        mockUpdatedAt
      );

      mockPatient.addNote(note);
      const beforeUpdate = mockPatient.getUpdatedAt();
      mockPatient.removeNote(note.id);
      const afterUpdate = mockPatient.getUpdatedAt();

      expect(afterUpdate).toBeInstanceOf(Date);
    });
  });

  describe('updateDetails', () => {
    it('should update patient details', () => {
      const newName = new Name('Jane Doe');
      const newDob = new DateOfBirth(new Date('1995-01-01'));

      mockPatient.updateDetails(newName, newDob);
      expect(mockPatient.getName()).toBe(newName);
      expect(mockPatient.getDob()).toBe(newDob);
      expect(mockPatient.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should update only name when dob is not provided', () => {
      const newName = new Name('Jane Doe');
      const originalDob = mockPatient.getDob();

      mockPatient.updateDetails(newName, originalDob);
      expect(mockPatient.getName()).toBe(newName);
      expect(mockPatient.getDob()).toBe(originalDob);
    });

    it('should update only dob when name is not provided', () => {
      const newDob = new DateOfBirth(new Date('1995-01-01'));
      const originalName = mockPatient.getName();

      mockPatient.updateDetails(originalName, newDob);
      expect(mockPatient.getName()).toBe(originalName);
      expect(mockPatient.getDob()).toBe(newDob);
    });

    it('should update the updatedAt timestamp when updating details', () => {
      const newName = new Name('Jane Doe');
      const newDob = new DateOfBirth(new Date('1995-01-01'));

      const beforeUpdate = mockPatient.getUpdatedAt();
      mockPatient.updateDetails(newName, newDob);
      const afterUpdate = mockPatient.getUpdatedAt();

      expect(afterUpdate).toBeInstanceOf(Date);
      expect(afterUpdate.getTime()).toBeGreaterThan(beforeUpdate.getTime());
    });
  });

  describe('getAge', () => {
    it('should calculate correct age', () => {
      const today = new Date();
      const birthDate = new Date(today.getFullYear() - 30, today.getMonth(), today.getDate());
      const patient = new Patient('456', mockName, new DateOfBirth(birthDate));

      expect(patient.getAge()).toBe(30);
    });

    it('should calculate age correctly when birthday has not occurred this year', () => {
      const today = new Date();
      const birthDate = new Date(today.getFullYear() - 30, today.getMonth() + 1, today.getDate());
      const patient = new Patient('456', mockName, new DateOfBirth(birthDate));

      expect(patient.getAge()).toBe(29);
    });

    it('should calculate age correctly when birthday has occurred this year', () => {
      const today = new Date();
      const birthDate = new Date(today.getFullYear() - 30, today.getMonth() - 1, today.getDate());
      const patient = new Patient('456', mockName, new DateOfBirth(birthDate));

      expect(patient.getAge()).toBe(30);
    });
  });

  describe('toJSON', () => {
    it('should convert patient to JSON format', () => {
      const json = mockPatient.toJSON();

      expect(json).toEqual({
        id: '123',
        name: mockName.getValue(),
        dob: mockDob.getValue(),
        createdAt: mockCreatedAt,
        updatedAt: mockUpdatedAt,
        notes: []
      });
    });

    it('should include notes in JSON when present', () => {
      const note = new Note(
        'note1',
        mockPatient.id,
        new Content('Test note'),
        'Test summary',
        undefined,
        mockCreatedAt,
        mockUpdatedAt
      );

      mockPatient.addNote(note);
      const json = mockPatient.toJSON();

      expect(json).toEqual({
        id: '123',
        name: mockName.getValue(),
        dob: mockDob.getValue(),
        createdAt: mockCreatedAt,
        updatedAt: mockPatient.getUpdatedAt(),
        notes: [note.toJSON()]
      });
    });

    it('should return a new array of notes each time', () => {
      const note = new Note(
        'note1',
        mockPatient.id,
        new Content('Test note'),
        'Test summary',
        undefined,
        mockCreatedAt,
        mockUpdatedAt
      );

      mockPatient.addNote(note);
      const json1 = mockPatient.toJSON();
      const json2 = mockPatient.toJSON();

      expect(json1.notes).not.toBe(json2.notes);
      expect(json1.notes).toEqual(json2.notes);
    });
  });
}); 