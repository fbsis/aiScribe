import { useQuery } from "@tanstack/react-query";
import { patientService } from "../services/patientService";

export function usePatient(id: string) {
  return useQuery({
    queryKey: ["patient", id],
    queryFn: () => patientService.getPatientById(id),
    enabled: !!id,
  });
} 