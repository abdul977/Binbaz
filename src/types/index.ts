// Type definitions for the application

export interface Student {
  id: string;
  name: string;
  email: string;
  semester: string;
  program: string;
  enrollmentYear: string;
  photo?: string;
}

export interface Course {
  code: string;
  title: string;
  instructor: string;
  creditHours: number;
}

export interface Result {
  courseCode: string;
  testScore: number;
  examScore: number;
  marks: number; // Total marks (testScore + examScore)
  grade: string;
  status: 'passed' | 'failed' | 'incomplete';
}

export interface StudentWithResults extends Student {
  results: Result[];
}

export interface AuthState {
  isAuthenticated: boolean;
  student: StudentWithResults | null;
  error: string | null;
  loading: boolean;
}

export interface CertificateData {
  studentName: string;
  studentId: string;
  program: string;
  semester: string;
  academicSession: string;
  gpa: number;
  performanceLevel: string;
  totalCourses: number;
  passedCourses: number;
  results: Result[];
  issueDate: string;
  certificateNumber: string;
}