export interface Patient {
  id: string;
  name: string;
  status?: "Assigned" | "On Hold";
  task?: string;
  assigned?: string;
} 