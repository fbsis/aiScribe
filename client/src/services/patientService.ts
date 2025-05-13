import api from './api';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: string;
  patientId: string;
  content: string;
  summary?: string;
  status: 'processing' | 'done' | 'error';
  errorMessage?: string;
  audioFile?: {
    id: string;
    filePath: string;
    publicUrl: string;
    duration: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePatientRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
}

export interface UpdatePatientRequest extends Partial<CreatePatientRequest> {}

export interface CreateTextNoteRequest {
  patientId: string;
  content: string;
}

export interface CreateAudioNoteRequest {
  patientId: string;
  audio: File;
}

export const patientService = {
  getAllPatients: () => 
    api.get<Patient[]>('/patients').then(res => res.data),

  getPatientById: (id: string) => 
    api.get<Patient>(`/patients/${id}`).then(res => res.data),

  createPatient: (patient: CreatePatientRequest) => 
    api.post<Patient>('/patients', patient).then(res => res.data),

  updatePatient: (id: string, patient: Partial<CreatePatientRequest>) => 
    api.patch<Patient>(`/patients/${id}`, patient).then(res => res.data),

  deletePatient: (id: string) => 
    api.delete(`/patients/${id}`).then(res => res.data),

  getPatientNotes: (patientId: string) => 
    api.get<Note[]>(`/notes/patient/${patientId}`).then(res => res.data),

  addPatientNote: (patientId: string, content: string) => 
    api.post<Note>('/notes', { patientId, content }).then(res => res.data),

  addPatientAudioNote: (patientId: string, audioFile: File) => {
    const formData = new FormData();
    formData.append('patientId', patientId);
    formData.append('audio', audioFile);
    return api.post<Note>('/notes/audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => res.data);
  },

  deletePatientNote: (noteId: string) => 
    api.delete(`/notes/${noteId}`).then(res => res.data),

  getNoteById: (noteId: string) => 
    api.get<Note>(`/notes/${noteId}`).then(res => res.data),

  createTextNote: (note: CreateTextNoteRequest) => 
    api.post<Note>('/notes', note).then(res => res.data),

  createAudioNote: (note: CreateAudioNoteRequest) => {
    const formData = new FormData();
    formData.append('patientId', note.patientId);
    formData.append('audio', note.audio);
    return api.post<Note>('/notes/audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => res.data)
  }
}; 