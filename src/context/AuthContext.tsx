import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, StudentWithResults } from '../types';
import { getStudentById } from '../data/students';

// Define action types
type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: StudentWithResults }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' };

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  student: null,
  error: null,
  loading: false
};

// Create the context
const AuthContext = createContext<{
  state: AuthState;
  login: (studentId: string) => Promise<void>;
  logout: () => void;
}>({
  state: initialState,
  login: async () => {},
  logout: () => {}
});

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        student: action.payload,
        loading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        student: null,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// Auth provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for saved auth on mount and refresh data from source
  useEffect(() => {
    const savedAuth = localStorage.getItem('studentAuth');
    if (savedAuth) {
      try {
        const { student } = JSON.parse(savedAuth);
        if (student) {
          // Always fetch fresh data from source instead of using cached data
          const freshStudent = getStudentById(student.id);
          if (freshStudent) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: freshStudent });
            // Update localStorage with fresh data
            localStorage.setItem('studentAuth', JSON.stringify({ student: freshStudent }));
          } else {
            // Student no longer exists, clear cache
            localStorage.removeItem('studentAuth');
          }
        }
      } catch (error) {
        localStorage.removeItem('studentAuth');
      }
    }
  }, []);

  // Login function
  const login = async (studentId: string): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const student = getStudentById(studentId);
      
      if (student) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: student });
        localStorage.setItem('studentAuth', JSON.stringify({ student }));
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid Student ID. Please try again.' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'An error occurred. Please try again.' });
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('studentAuth');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};