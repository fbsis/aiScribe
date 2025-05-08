import { Note } from './Note';
import { Name } from '../value-objects/Name';
import { DateOfBirth } from '../value-objects/DateOfBirth';
import { ValidationError } from '../errors/DomainError';

export class Patient {
  constructor(
    public readonly id: string,
    private name: Name,
    private dob: DateOfBirth,
    private notes: Note[] = [],
    public readonly createdAt: Date = new Date(),
    private updatedAt: Date = new Date()
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.id) {
      throw new ValidationError('Patient ID is required');
    }
  }

  public getName(): Name {
    return this.name;
  }

  public getDob(): DateOfBirth {
    return this.dob;
  }

  public getAge(): number {
    return this.dob.getAge();
  }

  public getNotes(): Note[] {
    return [...this.notes];
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public addNote(note: Note): void {
    this.notes.push(note);
    this.updatedAt = new Date();
  }

  public removeNote(noteId: string): void {
    this.notes = this.notes.filter(note => note.id !== noteId);
    this.updatedAt = new Date();
  }

  public updateDetails(name: Name, dob: DateOfBirth): void {
    this.name = name;
    this.dob = dob;
    this.updatedAt = new Date();
  }
} 