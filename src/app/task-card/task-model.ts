export interface Task {
  id: number;
  title: string;
  subject: string;
  courseCode?: string;
  status: string;
  priority: string;
  estimatedMinutes?: number;
  notes?: string;
  checklist?: string[];
  reminderEmail?: string;
}
