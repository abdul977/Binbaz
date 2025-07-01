import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoutingTest: React.FC = () => {
  const { state } = useAuth();
  const location = useLocation();

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">Routing Test Panel</h3>
      
      <div className="space-y-2 text-sm">
        <p><strong>Current URL:</strong> {location.pathname}</p>
        <p><strong>Authenticated:</strong> {state.isAuthenticated ? 'Yes' : 'No'}</p>
        <p><strong>Student:</strong> {state.student ? state.student.name : 'None'}</p>
      </div>

      <div className="mt-4 space-x-2">
        <Link 
          to="/" 
          className="inline-block px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Go to Login
        </Link>
        <Link 
          to="/dashboard" 
          className="inline-block px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
        >
          Go to Dashboard
        </Link>
        <Link 
          to="/certificate" 
          className="inline-block px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
        >
          Go to Certificate
        </Link>
        <Link 
          to="/nonexistent" 
          className="inline-block px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
        >
          Test 404
        </Link>
      </div>
    </div>
  );
};

export default RoutingTest;
