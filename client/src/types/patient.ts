export interface Patient {
  name: string;
  status: "Assigned" | "On Hold";
  task: string;
  assigned: string;
} 