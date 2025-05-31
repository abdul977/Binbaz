import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [showCertificatePreview, setShowCertificatePreview] = useState(false);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!state.isAuthenticated) {
      navigate('/');
    }
  }, [state.isAuthenticated, navigate]);
  
  // Handle loading state or no student data
  if (state.loading || !state.student) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-184px)] flex items-center justify-center bg-gray-100">
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
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-6">
            <StudentProfile student={state.student} />
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-2">
                <SemesterSummary results={state.student.results} />
              </div>
              <div>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center mb-4">
                    <FileText size={20} className="text-[#1A3A6E] mr-2" />
                    <h2 className="text-lg font-bold text-gray-800">Semester Info</h2>
                  </div>
                  <div className="space-y-3 text-sm">
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

                  <div className="mt-6">
                    <div className="flex items-center mb-3">
                      <Award size={18} className="text-[#F26522] mr-2" />
                      <h3 className="font-medium text-gray-800">Top Performance</h3>
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
              <div>
                <CertificateGenerator student={state.student} />
              </div>
            </div>
            
            <div className="mt-4">
              <ResultsTable results={state.student.results} />
            </div>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <h2 className="text-xl font-bold text-gray-800 col-span-full mb-2">All Courses</h2>
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