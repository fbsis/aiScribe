import { Patient } from '../types/patient';

/**
 * Filters patients by name using case-insensitive search
 * @param patients Array of patients to filter
 * @param searchTerm Search term to filter by
 * @returns Filtered array of patients
 */
export const filterPatientsByName = (patients: Patient[] | undefined, searchTerm: string): Patient[] => {
  if (!patients) return [];
  
  return patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}; 