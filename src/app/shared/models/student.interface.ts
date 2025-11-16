export interface Student {
  rollNo: number;
  name: string;
  gender: 'Male' | 'Female';
  dob: string; // ISO date string (YYYY-MM-DD)
  department: string;
}
