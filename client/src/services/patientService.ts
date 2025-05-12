import api from './api';

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  medicalHistory: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientRequest {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  medicalHistory: string;
}

export interface UpdatePatientRequest extends Partial<CreatePatientRequest> {}

export interface Note {
  id: string;
  type: 'text' | 'audio';
  content: string;
  createdAt: string;
  file?: File;
}

export const patientService = {
  getAllPatients: () => 
    api.get<Patient[]>('/patients').then(res => res.data),

  getPatientById: (id: string) => 
    api.get<Patient>(`/patients/${id}`).then(res => res.data),

  createPatient: (patient: CreatePatientRequest) => 
    api.post<Patient>('/patients', patient).then(res => res.data),

  updatePatient: (id: string, patient: UpdatePatientRequest) => 
    api.put<Patient>(`/patients/${id}`, patient).then(res => res.data),

  deletePatient: (id: string) => 
    api.delete(`/patients/${id}`).then(res => res.data),

  // Note-related methods
  getPatientNotes: (patientId: string) => 
    api.get<Note[]>(`/patients/${patientId}/notes`).then(res => res.data),

  addPatientNote: (patientId: string, note: Omit<Note, 'id' | 'createdAt'>) => {
    const formData = new FormData();
    formData.append('type', note.type);
    formData.append('content', note.content);
    if (note.file) {
      formData.append('file', note.file);
    }
    return api.post<Note>(`/patients/${patientId}/notes`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => res.data);
  },

  deletePatientNote: (patientId: string, noteId: string) => 
    api.delete(`/patients/${patientId}/notes/${noteId}`).then(res => res.data),
}; 