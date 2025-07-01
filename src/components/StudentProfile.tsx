import React from 'react';
import { StudentWithResults } from '../types';
import { calculateGPA, getPerformanceLevel } from '../utils/gradeCalculator';
import { User, Mail, BookOpen, Calendar } from 'lucide-react';

interface StudentProfileProps {
  student: StudentWithResults;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ student }) => {
  const gpa = calculateGPA(student.results);
  const performanceLevel = getPerformanceLevel(gpa);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-[#1A3A6E] to-[#2a5ba6] p-4 sm:p-6 text-white">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Student Profile</h2>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white/30 mr-4 flex-shrink-0">
              {student.photo ? (
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <User size={24} className="sm:w-8 sm:h-8" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold truncate">{student.name}</h3>
              <p className="text-sm opacity-90">{student.id}</p>
            </div>
            <div className="text-center bg-white/10 px-3 py-2 rounded-lg ml-2">
              <div className="text-xl font-bold">{gpa.toFixed(2)}</div>
              <div className="text-xs opacity-90">GPA</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center text-sm">
              <Mail size={14} className="mr-2 opacity-80 flex-shrink-0" />
              <span className="truncate">{student.email}</span>
            </div>
            <div className="flex items-center text-sm">
              <BookOpen size={14} className="mr-2 opacity-80 flex-shrink-0" />
              <span className="truncate">{student.program}</span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar size={14} className="mr-2 opacity-80 flex-shrink-0" />
              <span>Enrolled: {student.enrollmentYear}</span>
            </div>
          </div>

          <div className="mt-3 text-center">
            <div className="inline-block text-xs font-medium bg-white/20 rounded-full px-3 py-1">
              {performanceLevel}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center">
          <div className="mb-4 md:mb-0 md:mr-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30">
              {student.photo ? (
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <User size={40} />
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-bold">{student.name}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-3">
              <div className="flex items-center">
                <User size={16} className="mr-2 opacity-80" />
                <span>{student.id}</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2 opacity-80" />
                <span className="truncate">{student.email}</span>
              </div>
              <div className="flex items-center">
                <BookOpen size={16} className="mr-2 opacity-80" />
                <span>{student.program}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 opacity-80" />
                <span>Enrolled: {student.enrollmentYear}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0 md:ml-6 text-center bg-white/10 px-4 py-3 rounded-lg">
            <div className="text-3xl font-bold">{gpa.toFixed(2)}</div>
            <div className="text-sm opacity-90 mt-1">GPA</div>
            <div className="text-sm font-medium mt-1 bg-white/20 rounded-full px-3 py-1">
              {performanceLevel}
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 bg-blue-50 border-t border-blue-100">
        <div className="text-center text-blue-800">
          <h4 className="font-medium text-sm sm:text-base">{student.semester}</h4>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;