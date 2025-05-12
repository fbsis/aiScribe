import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { patientService, Patient, CreatePatientRequest, UpdatePatientRequest } from "../services/patientService";

export function usePatients() {
  const queryClient = useQueryClient();

  const query = useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: patientService.getAllPatients,
  });

  const createPatient = useMutation({
    mutationFn: (patient: CreatePatientRequest) => patientService.createPatient(patient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });

  const updatePatient = useMutation({
    mutationFn: ({ id, patient }: { id: string; patient: UpdatePatientRequest }) =>
      patientService.updatePatient(id, patient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });

  const deletePatient = useMutation({
    mutationFn: (id: string) => patientService.deletePatient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });

  return {
    ...query,
    createPatient,
    updatePatient,
    deletePatient,
  };
} 