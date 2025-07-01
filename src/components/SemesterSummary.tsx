import React from 'react';
import { Result } from '../types';
import { calculateGPA, getPerformanceLevel } from '../utils/gradeCalculator';
import { TrendingUp, Award, AlertTriangle } from 'lucide-react';

interface SemesterSummaryProps {
  results: Result[];
}

const SemesterSummary: React.FC<SemesterSummaryProps> = ({ results }) => {
  const gpa = calculateGPA(results);
  const performanceLevel = getPerformanceLevel(gpa);
  
  // Calculate statistics
  const totalCourses = results.length;
  const passedCourses = results.filter(r => r.status === 'passed').length;
  const failedCourses = results.filter(r => r.status === 'failed').length;
  const highestMark = Math.max(...results.map(r => r.marks));
  const lowestMark = Math.min(...results.map(r => r.marks));
  const averageMark = results.reduce((sum, r) => sum + r.marks, 0) / totalCourses;
  
  const getGpaColor = () => {
    if (gpa >= 3.7) return 'text-emerald-600';
    if (gpa >= 3.0) return 'text-blue-600';
    if (gpa >= 2.0) return 'text-yellow-600';
    if (gpa >= 1.0) return 'text-orange-600';
    return 'text-red-600';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 sm:p-6 text-white">
        <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
          <TrendingUp size={18} className="mr-2 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Semester Performance Summary</span>
          <span className="sm:hidden">Performance Summary</span>
        </h2>

        {/* Mobile Layout */}
        <div className="block sm:hidden space-y-4">
          {/* GPA Card - Full Width on Mobile */}
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className={`text-3xl font-bold ${getGpaColor()}`}>{gpa.toFixed(2)}</div>
            <div className="mt-1 text-sm">Semester GPA</div>
            <div className="mt-2 inline-block bg-white/20 px-3 py-1 rounded-full text-xs">
              {performanceLevel}
            </div>
          </div>

          {/* Course Statistics - Compact Grid */}
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-base font-medium mb-3">Course Statistics</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-xs opacity-80">Total</div>
                <div className="font-bold text-lg">{totalCourses}</div>
              </div>
              <div className="text-center">
                <div className="text-xs opacity-80">Passed</div>
                <div className="font-bold text-lg text-green-300">{passedCourses}</div>
              </div>
              <div className="text-center">
                <div className="text-xs opacity-80">Failed</div>
                <div className="font-bold text-lg text-red-300">{failedCourses}</div>
              </div>
              <div className="text-center">
                <div className="text-xs opacity-80">Pass Rate</div>
                <div className="font-bold text-lg">{Math.round((passedCourses / totalCourses) * 100)}%</div>
              </div>
            </div>
          </div>

          {/* Marks Overview - Compact */}
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-base font-medium mb-3">Marks Overview</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="text-xs opacity-80">Highest</div>
                <div className="font-bold text-sm">{highestMark}/100</div>
              </div>
              <div className="flex justify-between">
                <div className="text-xs opacity-80">Lowest</div>
                <div className="font-bold text-sm">{lowestMark}/100</div>
              </div>
              <div className="flex justify-between">
                <div className="text-xs opacity-80">Average</div>
                <div className="font-bold text-sm">{averageMark.toFixed(1)}/100</div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop/Tablet Layout */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className={`text-4xl font-bold ${getGpaColor()}`}>{gpa.toFixed(2)}</div>
            <div className="mt-1 text-sm">Semester GPA</div>
            <div className="mt-2 inline-block bg-white/20 px-3 py-1 rounded-full text-sm">
              {performanceLevel}
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Course Statistics</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-sm opacity-80">Total Courses</div>
                <div className="font-bold">{totalCourses}</div>
              </div>
              <div>
                <div className="text-sm opacity-80">Passed</div>
                <div className="font-bold text-green-300">{passedCourses}</div>
              </div>
              <div>
                <div className="text-sm opacity-80">Failed</div>
                <div className="font-bold text-red-300">{failedCourses}</div>
              </div>
              <div>
                <div className="text-sm opacity-80">Pass Rate</div>
                <div className="font-bold">{Math.round((passedCourses / totalCourses) * 100)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Marks Overview</h3>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between">
                <div className="text-sm opacity-80">Highest Mark</div>
                <div className="font-bold">{highestMark}/100</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm opacity-80">Lowest Mark</div>
                <div className="font-bold">{lowestMark}/100</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm opacity-80">Average Mark</div>
                <div className="font-bold">{averageMark.toFixed(1)}/100</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        {failedCourses > 0 ? (
          <div className="flex items-start p-3 bg-red-50 border border-red-100 rounded-md text-red-800">
            <AlertTriangle size={18} className="mr-2 mt-0.5 flex-shrink-0 sm:w-5 sm:h-5" />
            <div>
              <p className="font-medium text-sm sm:text-base">Academic Warning</p>
              <p className="text-xs sm:text-sm mt-1">
                You have failed {failedCourses} course{failedCourses > 1 ? 's' : ''}.
                Please contact your academic advisor for guidance on how to improve your academic performance.
              </p>
            </div>
          </div>
        ) : gpa >= 3.7 ? (
          <div className="flex items-start p-3 bg-green-50 border border-green-100 rounded-md text-green-800">
            <Award size={18} className="mr-2 mt-0.5 flex-shrink-0 sm:w-5 sm:h-5" />
            <div>
              <p className="font-medium text-sm sm:text-base">Excellent Performance!</p>
              <p className="text-xs sm:text-sm mt-1">
                Congratulations on your outstanding academic achievement.
                You are on the Dean's List for this semester.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SemesterSummary;