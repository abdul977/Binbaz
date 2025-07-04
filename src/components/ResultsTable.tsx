import React, { useState } from 'react';
import { Result, Course } from '../types';
import { getCourseByCourseCode } from '../data/courses';
import { getGradeColor, getGradeStatusColor } from '../utils/gradeCalculator';
import { Search, Download, FileText, User, BookOpen } from 'lucide-react';

interface ResultsTableProps {
  results: Result[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter results based on search term
  const filteredResults = results.filter(result => {
    const course = getCourseByCourseCode(result.courseCode);
    if (!course) return false;
    
    const searchString = 
      `${result.courseCode} ${course.title} ${course.instructor}`.toLowerCase();
    
    return searchString.includes(searchTerm.toLowerCase());
  });
  
  // Mobile card component
  const MobileResultCard: React.FC<{ result: Result; course: Course }> = ({ result, course }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{result.courseCode}</h3>
          <p className="text-sm text-gray-600 font-medium">{course.title}</p>
        </div>
        <div className={`text-2xl font-bold ${getGradeColor(result.grade)} bg-gray-50 rounded-full h-12 w-12 flex items-center justify-center`}>
          {result.grade}
        </div>
      </div>

      <div className="flex items-center text-gray-600 mb-2">
        <User size={14} className="mr-2" />
        <span className="text-sm">{course.instructor}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="text-sm">
          <span className="text-gray-500">Test Score:</span>
          <span className="font-medium ml-1">{result.testScore}/40</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Exam Score:</span>
          <span className="font-medium ml-1">{result.examScore}/60</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div className="text-sm font-semibold text-gray-800">
          Total: <span className="font-bold">{result.marks}/100</span>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeStatusColor(result.status)}`}>
          {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
        </span>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-3 sm:mb-0">Course Results</h2>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3A6E] transition-all duration-200"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <button
              className="bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-700 px-4 py-2 rounded-md flex items-center justify-center"
              aria-label="Export as PDF"
            >
              <Download size={18} className="mr-1" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="block md:hidden p-4">
        {filteredResults.length > 0 ? (
          filteredResults.map((result, index) => {
            const course = getCourseByCourseCode(result.courseCode) as Course;
            return (
              <MobileResultCard key={index} result={result} course={course} />
            );
          })
        ) : (
          <div className="text-center text-gray-500 py-8">
            <FileText size={32} className="mb-2 text-gray-400 mx-auto" />
            <p className="text-lg font-medium">No results found</p>
            <p className="text-sm">Try adjusting your search term</p>
          </div>
        )}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Instructor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Test Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exam Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Marks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredResults.length > 0 ? (
              filteredResults.map((result, index) => {
                const course = getCourseByCourseCode(result.courseCode) as Course;
                return (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {result.courseCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {course.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {course.instructor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.testScore}/40
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.examScore}/60
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {result.marks}/100
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-medium ${getGradeColor(result.grade)}`}>
                        {result.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeStatusColor(result.status)}`}>
                        {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <FileText size={32} className="mb-2 text-gray-400" />
                    <p className="text-lg font-medium">No results found</p>
                    <p className="text-sm">Try adjusting your search term</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;