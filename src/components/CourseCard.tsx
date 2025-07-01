import React from 'react';
import { Result } from '../types';
import { getCourseByCourseCode } from '../data/courses';
import { getGradeColor } from '../utils/gradeCalculator';
import { BookOpen, User } from 'lucide-react';

interface CourseCardProps {
  result: Result;
}

const CourseCard: React.FC<CourseCardProps> = ({ result }) => {
  const course = getCourseByCourseCode(result.courseCode);
  
  if (!course) return null;
  
  // Determine background gradient based on status
  let gradientClass = 'from-blue-500 to-blue-600';
  if (result.status === 'failed') {
    gradientClass = 'from-red-500 to-red-600';
  } else if (result.grade === 'A+' || result.grade === 'A') {
    gradientClass = 'from-emerald-500 to-emerald-600';
  }
  
  return (
    <div className="rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className={`bg-gradient-to-r ${gradientClass} p-3 sm:p-4 text-white`}>
        <div className="flex justify-between items-start">
          <div className="min-w-0 flex-1 mr-3">
            <h3 className="font-bold text-base sm:text-lg truncate">{result.courseCode}</h3>
            <p className="mt-1 text-white/90 font-medium text-sm sm:text-base leading-tight">{course.title}</p>
          </div>
          <div className={`text-xl sm:text-2xl font-bold ${getGradeColor(result.grade)} bg-white rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center flex-shrink-0`}>
            {result.grade}
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 bg-white">
        <div className="flex items-center text-gray-600 mb-2">
          <User size={14} className="mr-2 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm truncate">{course.instructor}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-3">
          <BookOpen size={14} className="mr-2 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">{course.creditHours} Credit Hours</span>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="text-xs sm:text-sm text-gray-600">
              <span className="block sm:inline">Test:</span>
              <span className="font-medium ml-0 sm:ml-1">{result.testScore}/40</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              <span className="block sm:inline">Exam:</span>
              <span className="font-medium ml-0 sm:ml-1">{result.examScore}/60</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xs sm:text-sm text-gray-800 font-semibold">
              Total: <span className="font-bold">{result.marks}/100</span>
            </div>
            <div className={`text-xs font-medium px-2 py-1 rounded-full uppercase ${
              result.status === 'passed'
                ? 'bg-green-100 text-green-800'
                : result.status === 'failed'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
            }`}>
              {result.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;