import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-4 sm:py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <img
              src="https://vdqbjdfhcxdkpsdrojtd.supabase.co/storage/v1/object/public/media-binbaz//binbaz%20logo.jpg"
              alt="Binbaz International Academy"
              className="h-10 sm:h-12 mb-2 mx-auto md:mx-0"
            />
            <p className="text-xs sm:text-sm text-gray-600 max-w-xs mx-auto md:mx-0">
              Binbaz International Academy (BIA) Online Islamic Institute
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs sm:text-sm text-gray-600">
              &copy; {currentYear} Binbaz International Academy. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Student Results Portal | Academic Session 2024/2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;