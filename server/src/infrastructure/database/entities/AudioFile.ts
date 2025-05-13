import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Note } from './Note';

@Entity('audio_files')
export class AudioFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  noteId: string;

  @OneToOne(() => Note, note => note.audioFile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'noteId' })
  note: Note;

  @Column()
  filePath: string;

  @Column()
  publicUrl: string;

  @Column()
  duration: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 