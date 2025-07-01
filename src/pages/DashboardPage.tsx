import React, { useState } from 'react';
import Layout from '../components/Layout';
import StudentProfile from '../components/StudentProfile';
import ResultsTable from '../components/ResultsTable';
import SemesterSummary from '../components/SemesterSummary';
import CourseCard from '../components/CourseCard';
import CertificateGenerator from '../components/Certificate/CertificateGenerator';
import CertificateTemplate from '../components/Certificate/CertificateTemplate';
import CertificatePreview from '../components/Certificate/CertificatePreview';
import { useAuth } from '../context/AuthContext';
import { FileText, Award } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { state } = useAuth();
  const [showCertificatePreview, setShowCertificatePreview] = useState(false);

  // ProtectedRoute ensures authentication, so we can safely access state.student
  if (!state.student) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3A6E] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your results...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="bg-gray-100 min-h-[calc(100vh-184px)]">
        <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
          <div className="grid gap-4 sm:gap-6">
            <StudentProfile student={state.student} />

            {/* Mobile-first layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Semester Summary - Full width on mobile, 2 cols on desktop */}
              <div className="lg:col-span-2">
                <SemesterSummary results={state.student.results} />
              </div>

              {/* Semester Info - Stacked on mobile */}
              <div className="order-3 lg:order-2">
                <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <FileText size={18} className="text-[#1A3A6E] mr-2 sm:w-5 sm:h-5" />
                    <h2 className="text-base sm:text-lg font-bold text-gray-800">Semester Info</h2>
                  </div>
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Academic Session:</span>
                      <span className="font-medium">2024/2025</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Semester:</span>
                      <span className="font-medium">First Semester</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Total Courses:</span>
                      <span className="font-medium">{state.student.results.length}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-gray-600">Result Status:</span>
                      <span className="font-medium text-green-600">Published</span>
                    </div>
                  </div>

                  {/* Top Performance - Hidden on mobile, shown on larger screens */}
                  <div className="mt-4 sm:mt-6 hidden sm:block">
                    <div className="flex items-center mb-3">
                      <Award size={16} className="text-[#F26522] mr-2 sm:w-[18px] sm:h-[18px]" />
                      <h3 className="font-medium text-gray-800 text-sm sm:text-base">Top Performance</h3>
                    </div>

                    {state.student.results
                      .sort((a, b) => b.marks - a.marks)
                      .slice(0, 1)
                      .map((topResult, index) => (
                        <CourseCard key={index} result={topResult} />
                      ))}
                  </div>
                </div>
              </div>

              {/* Certificate Generator - Stacked on mobile */}
              <div className="order-2 lg:order-3">
                <CertificateGenerator student={state.student} />
              </div>
            </div>

            {/* Top Performance for Mobile - Separate section */}
            <div className="block sm:hidden">
              <div className="bg-white rounded-lg shadow-md p-3">
                <div className="flex items-center mb-3">
                  <Award size={16} className="text-[#F26522] mr-2" />
                  <h3 className="font-medium text-gray-800 text-sm">Top Performance</h3>
                </div>
                {state.student.results
                  .sort((a, b) => b.marks - a.marks)
                  .slice(0, 1)
                  .map((topResult, index) => (
                    <CourseCard key={index} result={topResult} />
                  ))}
              </div>
            </div>

            {/* Results Table */}
            <div>
              <ResultsTable results={state.student.results} />
            </div>

            {/* All Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 col-span-full mb-2">All Courses</h2>
              {state.student.results.map((result, index) => (
                <CourseCard key={index} result={result} />
              ))}
            </div>

            {/* Hidden Certificate Template for Generation */}
            <div className="hidden">
              <CertificateTemplate student={state.student} />
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Preview Modal */}
      <CertificatePreview
        student={state.student}
        isOpen={showCertificatePreview}
        onClose={() => setShowCertificatePreview(false)}
      />
    </Layout>
  );
};

export default DashboardPage;