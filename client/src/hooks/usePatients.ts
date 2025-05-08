import { useQuery } from "@tanstack/react-query";
import { Patient } from "../types/patient";

const mockPatients: Patient[] = [
  { name: "John Doe", status: "Assigned", task: "SOC/ROC", assigned: "Katie" },
  { name: "Jane Smith", status: "Assigned", task: "Discharge", assigned: "Celeste" },
  { name: "Robert Johnson", status: "Assigned", task: "Recertification", assigned: "Amanda" },
  { name: "John Doe", status: "On Hold", task: "Hospice", assigned: "Amy" },
  { name: "Jane Smith", status: "On Hold", task: "Full Chart Audit", assigned: "Jen" },
  { name: "Robert Johnson", status: "On Hold", task: "SOC/ROC", assigned: "John" },
];

async function fetchPatients(): Promise<Patient[]> {
  await new Promise((res) => setTimeout(res, 500));
  return mockPatients;
}

export function usePatients() {
  return useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });
} 