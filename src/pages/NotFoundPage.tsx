import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const { state } = useAuth();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const getHomeLink = () => {
    return state.isAuthenticated ? '/dashboard' : '/';
  };

  const getHomeLinkText = () => {
    return state.isAuthenticated ? 'Go to Dashboard' : 'Go to Login';
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-red-100 p-4">
                <AlertTriangle className="h-12 w-12 text-red-600" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">404</h1>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleGoBack}
                className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors duration-200 font-medium"
              >
                <ArrowLeft className="mr-2" size={18} />
                Go Back
              </button>

              <Link
                to={getHomeLink()}
                className="w-full flex items-center justify-center px-4 py-3 bg-[#1A3A6E] hover:bg-[#2a5ba6] text-white rounded-md transition-colors duration-200 font-medium"
              >
                <Home className="mr-2" size={18} />
                {getHomeLinkText()}
              </Link>
            </div>

            {/* Additional Help */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                If you believe this is an error, please contact support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
