import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Award, FileText } from 'lucide-react';

const Navigation: React.FC = () => {
  const { state } = useAuth();
  const location = useLocation();

  // Only show navigation if user is authenticated
  if (!state.isAuthenticated || !state.student) {
    return null;
  }

  const navItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: Home,
      description: 'View your results'
    },
    {
      path: '/certificate',
      label: 'Certificate',
      icon: Award,
      description: 'Download certificate'
    }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Navigation Links */}
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-[#1A3A6E] text-white'
                      : 'text-gray-600 hover:text-[#1A3A6E] hover:bg-gray-100'
                  }`}
                  title={item.description}
                >
                  <Icon size={18} className="mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Breadcrumb */}
          <div className="hidden md:flex items-center text-sm text-gray-500">
            <span className="font-medium text-gray-700">{state.student.name}</span>
            <span className="mx-2">•</span>
            <span>
              {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
