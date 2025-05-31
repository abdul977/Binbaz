import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Loader } from 'lucide-react';

const AuthForm: React.FC = () => {
  const [studentId, setStudentId] = useState('');
  const { state, login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.trim()) {
      await login(studentId.trim());
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
      <div className="bg-[#1A3A6E] p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-1">Student Login</h2>
        <p className="text-blue-100">Enter your Student ID to view your results</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-6">
          <label 
            htmlFor="studentId" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Student ID
          </label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter your Student ID"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1A3A6E] focus:border-transparent transition-all duration-200"
            required
          />
          {state.error && (
            <p className="mt-2 text-sm text-red-600">{state.error}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={state.loading}
          className={`w-full bg-[#F26522] text-white py-3 px-4 rounded-md font-medium flex items-center justify-center
            ${state.loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#e05a1b] transition-colors duration-200'}`}
        >
          {state.loading ? (
            <>
              <Loader size={20} className="animate-spin mr-2" />
              Verifying...
            </>
          ) : (
            'View Results'
          )}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;