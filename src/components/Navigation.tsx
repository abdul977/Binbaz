import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Award, FileText, Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const { state } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
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

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#1A3A6E] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1A3A6E] transition-colors duration-200"
              aria-expanded="false"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>

          {/* Current Page Title for Mobile */}
          <div className="md:hidden flex-1 text-center">
            <span className="text-sm font-medium text-gray-700">
              {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </span>
          </div>

          {/* Desktop Breadcrumb */}
          <div className="hidden md:flex items-center text-sm text-gray-500">
            <span className="font-medium text-gray-700">{state.student.name}</span>
            <span className="mx-2">•</span>
            <span>
              {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </span>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-[#1A3A6E] text-white'
                        : 'text-gray-600 hover:text-[#1A3A6E] hover:bg-gray-100'
                    }`}
                    title={item.description}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon size={20} className="mr-3" />
                    <div>
                      <div>{item.label}</div>
                      <div className="text-xs opacity-75">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile User Info */}
            <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
              <div className="text-sm font-medium text-gray-700">{state.student.name}</div>
              <div className="text-xs text-gray-500">{state.student.id}</div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
