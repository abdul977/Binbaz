import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { state } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute - Auth state:', {
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    hasStudent: !!state.student,
    currentPath: location.pathname
  });

  // Show loading state while checking authentication
  if (state.loading) {
    console.log('ProtectedRoute - Showing loading state');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3A6E] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated, preserving the intended destination
  if (!state.isAuthenticated) {
    console.log('ProtectedRoute - Not authenticated, redirecting to login');
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Redirect to login if no student data (shouldn't happen but safety check)
  if (!state.student) {
    console.log('ProtectedRoute - No student data, redirecting to login');
    return <Navigate to="/" replace />;
  }

  console.log('ProtectedRoute - Rendering protected content');
  return <>{children}</>;
};

export default ProtectedRoute;
