import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { state, logout } = useAuth();

  const getHomeLink = () => {
    return state.isAuthenticated ? '/dashboard' : '/';
  };

  return (
    <header className="bg-[#1A3A6E] text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <Link to={getHomeLink()} className="flex items-center hover:opacity-90 transition-opacity duration-200 min-w-0 flex-1 mr-4">
            <img
              src="https://vdqbjdfhcxdkpsdrojtd.supabase.co/storage/v1/object/public/media-binbaz//binbaz%20logo.jpg"
              alt="Binbaz International Academy"
              className="h-12 sm:h-14 md:h-16 mr-2 sm:mr-3 flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-sm sm:text-lg md:text-xl font-bold leading-tight truncate">
                Binbaz International Academy
              </h1>
              <p className="text-xs sm:text-sm opacity-90 hidden sm:block">
                Student Results Portal
              </p>
            </div>
          </Link>

          {/* User Actions */}
          {state.isAuthenticated && state.student && (
            <div className="flex items-center flex-shrink-0">
              {/* Desktop User Info */}
              <div className="mr-3 md:mr-4 text-right hidden lg:block">
                <p className="font-medium text-sm truncate max-w-32">{state.student.name}</p>
                <p className="text-xs opacity-80">{state.student.id}</p>
              </div>

              {/* Mobile User Info - Compact */}
              <div className="mr-2 text-right lg:hidden">
                <p className="font-medium text-xs truncate max-w-20 sm:max-w-24">{state.student.name.split(' ')[0]}</p>
                <p className="text-xs opacity-80 hidden sm:block">{state.student.id}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-1 sm:space-x-2">
                <button
                  className="flex items-center justify-center rounded-full w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 transition-colors duration-200"
                  aria-label="View Profile"
                >
                  <User size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
                <button
                  onClick={logout}
                  className="flex items-center justify-center rounded-full w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 transition-colors duration-200"
                  aria-label="Logout"
                >
                  <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;