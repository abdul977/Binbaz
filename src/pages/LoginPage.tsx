import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import { BookOpen } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (state.isAuthenticated) {
      // Check if there's a redirect location from ProtectedRoute
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [state.isAuthenticated, navigate, location.state]);
  
  return (
    <Layout>
      <div className="min-h-[calc(100vh-184px)] bg-gray-100 flex flex-col items-center justify-center px-4 py-6 sm:py-12">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A3A6E] mb-2">
              Student Results Portal
            </h1>
            <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base">
              Access your academic results for the 2024/2025 academic session
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
            <div className="w-full md:w-1/2">
              <AuthForm />
            </div>

            <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#F26522] p-4 sm:p-6 text-white">
                <h2 className="text-xl sm:text-2xl font-bold mb-1">Welcome to BIA</h2>
                <p className="text-orange-100 text-sm sm:text-base">Binbaz International Academy</p>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-start mb-4">
                  <BookOpen className="text-[#1A3A6E] mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base">Online Islamic Institute</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1">
                      Access your academic performance and course results through our
                      secure student portal.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 sm:p-4 rounded-md mt-4 sm:mt-6">
                  <h3 className="font-bold text-[#1A3A6E] mb-2 text-sm sm:text-base">2024/2025 Academic Session</h3>
                  <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3">
                    First Semester courses include:
                  </p>
                  <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                    <li>• Advanced Arabic Reading (ARB 211)</li>
                    <li>• Arabic Language (ARB 201)</li>
                    <li>• Quran Memorization</li>
                    <li>• Phonology (TAJ 201)</li>
                    <li className="hidden sm:list-item">• Memorization of Selected Books (Mutoon 201)</li>
                    <li className="hidden sm:list-item">• Islamic Jurisprudence & Hadith (FIQ/HAD 201)</li>
                  </ul>

                  {/* Show remaining courses on mobile with toggle */}
                  <div className="sm:hidden mt-2">
                    <details className="text-xs text-gray-600">
                      <summary className="cursor-pointer text-[#1A3A6E] font-medium">Show more courses...</summary>
                      <ul className="mt-1 space-y-1">
                        <li>• Memorization of Selected Books (Mutoon 201)</li>
                        <li>• Islamic Jurisprudence & Hadith (FIQ/HAD 201)</li>
                      </ul>
                    </details>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
                  <p>
                    If you're having trouble accessing your results, please contact the
                    academic office for assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;