import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';

const TestPage: React.FC = () => {
  const location = useLocation();

  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-green-600 mb-4">Test Page</h1>
            <p className="text-gray-600 mb-4">
              This is a test page to verify routing is working correctly.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Current path: {location.pathname}
            </p>
            
            <div className="space-y-4">
              <Link
                to="/"
                className="block w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Go to Login
              </Link>
              <Link
                to="/dashboard"
                className="block w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/certificate"
                className="block w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition-colors"
              >
                Go to Certificate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TestPage;
