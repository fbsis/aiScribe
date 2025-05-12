import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Note } from './Note';

@Entity('audio_files')
export class AudioFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  noteId: string;

  @OneToOne(() => Note, note => note.audioFile)
  @JoinColumn()
  note: Note;

  @Column()
  filePath: string;

  @Column()
  duration: number;

  @CreateDateColumn()
  createdAt: Date;
} 