import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Patient } from './Patient';
import { AudioFile } from './AudioFile';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  @ManyToOne(() => Patient, patient => patient.notes)
  patient: Patient;

  @Column('text')
  content: string;

  @Column('text', { nullable: true })
  summary: string;

  @OneToOne(() => AudioFile, audioFile => audioFile.note)
  @JoinColumn()
  audioFile: AudioFile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 