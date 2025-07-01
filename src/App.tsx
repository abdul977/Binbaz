import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CertificatePage from './pages/CertificatePage';
import NotFoundPage from './pages/NotFoundPage';
import TestPage from './pages/TestPage';

// Debug component to log route changes
const RouteLogger: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('Route changed to:', location.pathname, location);
  }, [location]);

  return null;
};

function App() {
  console.log('App component rendering');

  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteLogger />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/test" element={<TestPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificate"
            element={
              <ProtectedRoute>
                <CertificatePage />
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route path="/404" element={<NotFoundPage />} />

          {/* Catch all - redirect to 404 */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;