import { StudentWithResults, CertificateData } from '../types';
import { calculateGPA, getPerformanceLevel } from './gradeCalculator';

/**
 * Generate certificate data from student information
 */
export const generateCertificateData = (student: StudentWithResults): CertificateData => {
  const gpa = calculateGPA(student.results);
  const performanceLevel = getPerformanceLevel(gpa);
  const totalCourses = student.results.length;
  const passedCourses = student.results.filter(r => r.status === 'passed').length;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return {
    studentName: student.name,
    studentId: student.id,
    program: student.program,
    semester: student.semester,
    academicSession: '2024/2025',
    gpa,
    performanceLevel,
    totalCourses,
    passedCourses,
    results: student.results,
    issueDate: currentDate,
    certificateNumber: `BIA-${student.id}-${new Date().getFullYear()}`
  };
};

/**
 * Get certificate remarks based on performance
 */
export const getCertificateRemarks = (gpa: number, passedCourses: number, totalCourses: number): string => {
  const passRate = (passedCourses / totalCourses) * 100;
  
  if (gpa >= 3.7 && passRate === 100) {
    return 'Graduated with Distinction';
  } else if (gpa >= 3.0 && passRate >= 90) {
    return 'Graduated with Merit';
  } else if (gpa >= 2.0 && passRate >= 80) {
    return 'Graduated Successfully';
  } else if (passRate >= 60) {
    return 'Completed with Satisfactory Performance';
  } else {
    return 'Partial Completion';
  }
};

/**
 * Format course code for display (handle special cases)
 */
export const formatCourseCode = (courseCode: string): string => {
  // Handle the TAJ course code correction
  if (courseCode === 'TDJ 201') {
    return 'TAJ 201';
  }
  
  // Handle FIQ/HAD combination
  if (courseCode.includes('FIQ') && courseCode.includes('HAD')) {
    return 'FIQ/HAD 201';
  }
  
  return courseCode;
};

/**
 * Get grade description for certificate
 */
export const getGradeDescription = (grade: string): string => {
  const gradeDescriptions: Record<string, string> = {
    'A+': 'Excellent',
    'A': 'Excellent',
    'A-': 'Very Good',
    'B+': 'Very Good',
    'B': 'Good',
    'B-': 'Good',
    'C+': 'Satisfactory',
    'C': 'Satisfactory',
    'C-': 'Satisfactory',
    'D+': 'Pass',
    'D': 'Pass',
    'F': 'Fail'
  };
  
  return gradeDescriptions[grade] || 'Unknown';
};

/**
 * Calculate overall performance statistics
 */
export const calculatePerformanceStats = (results: any[]) => {
  const totalMarks = results.reduce((sum, result) => sum + result.marks, 0);
  const averageMark = totalMarks / results.length;
  const highestMark = Math.max(...results.map(r => r.marks));
  const lowestMark = Math.min(...results.map(r => r.marks));
  
  return {
    averageMark: Math.round(averageMark * 100) / 100,
    highestMark,
    lowestMark,
    totalMarks
  };
};

/**
 * Validate certificate generation requirements
 */
export const validateCertificateRequirements = (student: StudentWithResults): {
  isValid: boolean;
  issues: string[];
} => {
  const issues: string[] = [];
  
  if (!student.name || student.name.trim().length === 0) {
    issues.push('Student name is required');
  }
  
  if (!student.id || student.id.trim().length === 0) {
    issues.push('Student ID is required');
  }
  
  if (!student.results || student.results.length === 0) {
    issues.push('No course results available');
  }
  
  if (student.results && student.results.length > 0) {
    const passedCourses = student.results.filter(r => r.status === 'passed').length;
    if (passedCourses === 0) {
      issues.push('No courses passed - certificate cannot be issued');
    }
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
};

/**
 * Generate certificate filename
 */
export const generateCertificateFilename = (student: StudentWithResults, format: string): string => {
  const cleanName = student.name.replace(/[^a-zA-Z0-9]/g, '_');
  const timestamp = new Date().toISOString().split('T')[0];
  return `BIA_Certificate_${cleanName}_${student.id}_${timestamp}.${format}`;
};

/**
 * Get certificate print styles
 */
export const getCertificatePrintStyles = (): string => {
  return `
    @media print {
      body { 
        margin: 0; 
        padding: 0; 
        background: white !important;
      }
      
      #certificate-template {
        width: 100% !important;
        height: 100vh !important;
        page-break-inside: avoid;
        transform: none !important;
        margin: 0 !important;
        padding: 20px !important;
      }
      
      .no-print {
        display: none !important;
      }
      
      .print-only {
        display: block !important;
      }
    }
    
    @page {
      size: A3 landscape;
      margin: 0.5in;
    }
  `;
};
