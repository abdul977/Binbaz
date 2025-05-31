// Utility functions for calculating grades and statistics

export const calculateGPA = (results: { grade: string }[]): number => {
  const gradePoints: Record<string, number> = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'F': 0.0
  };

  const totalPoints = results.reduce((sum, result) => {
    return sum + (gradePoints[result.grade] || 0);
  }, 0);

  return results.length > 0 ? Number((totalPoints / results.length).toFixed(2)) : 0;
};

export const getGradeColor = (grade: string): string => {
  if (grade === 'A+' || grade === 'A') return 'text-emerald-600';
  if (grade === 'A-' || grade === 'B+' || grade === 'B') return 'text-blue-600';
  if (grade === 'B-' || grade === 'C+' || grade === 'C') return 'text-yellow-600';
  if (grade === 'C-' || grade === 'D+' || grade === 'D') return 'text-orange-500';
  return 'text-red-600'; // F
};

export const getGradeStatusColor = (status: 'passed' | 'failed' | 'incomplete'): string => {
  if (status === 'passed') return 'bg-green-100 text-green-800';
  if (status === 'failed') return 'bg-red-100 text-red-800';
  return 'bg-yellow-100 text-yellow-800'; // incomplete
};

export const getLetterGrade = (marks: number): string => {
  if (marks >= 90) return 'A+';
  if (marks >= 85) return 'A';
  if (marks >= 80) return 'A-';
  if (marks >= 75) return 'B+';
  if (marks >= 70) return 'B';
  if (marks >= 65) return 'B-';
  if (marks >= 60) return 'C+';
  if (marks >= 55) return 'C';
  if (marks >= 50) return 'C-';
  if (marks >= 45) return 'D+';
  if (marks >= 40) return 'D';
  return 'F';
};

export const getPerformanceLevel = (gpa: number): string => {
  if (gpa >= 3.7) return 'Excellent';
  if (gpa >= 3.0) return 'Very Good';
  if (gpa >= 2.3) return 'Good';
  if (gpa >= 1.7) return 'Satisfactory';
  if (gpa >= 1.0) return 'Poor';
  return 'Unsatisfactory';
};