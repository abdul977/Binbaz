import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { state, logout } = useAuth();
  
  return (
    <header className="bg-[#1A3A6E] text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://vdqbjdfhcxdkpsdrojtd.supabase.co/storage/v1/object/public/media-binbaz//binbaz%20logo.jpg"
            alt="Binbaz International Academy"
            className="h-16 mr-3"
          />
          <div>
            <h1 className="text-xl font-bold">Binbaz International Academy</h1>
            <p className="text-sm opacity-90">Student Results Portal</p>
          </div>
        </div>
        
        {state.isAuthenticated && state.student && (
          <div className="flex items-center">
            <div className="mr-4 text-right hidden md:block">
              <p className="font-medium">{state.student.name}</p>
              <p className="text-sm opacity-80">{state.student.id}</p>
            </div>
            <div className="flex">
              <button 
                className="flex items-center justify-center rounded-full w-10 h-10 bg-white/10 mr-2 hover:bg-white/20 transition-colors duration-200"
                aria-label="View Profile"
              >
                <User size={18} />
              </button>
              <button 
                onClick={logout}
                className="flex items-center justify-center rounded-full w-10 h-10 bg-white/10 hover:bg-white/20 transition-colors duration-200"
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;