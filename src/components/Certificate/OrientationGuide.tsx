import React, { useState, useEffect } from 'react';
import { RotateCcw, Smartphone } from 'lucide-react';

interface OrientationGuideProps {
  className?: string;
}

const OrientationGuide: React.FC<OrientationGuideProps> = ({ className = '' }) => {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isPortraitMode = window.innerHeight > window.innerWidth;
      const isMobileDevice = window.innerWidth <= 768;
      
      setIsPortrait(isPortraitMode);
      setIsMobile(isMobileDevice);
    };

    // Check on mount
    checkOrientation();

    // Listen for orientation changes
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Only show guide on mobile devices in portrait mode
  if (!isMobile || !isPortrait) {
    return null;
  }

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${className}`}>
      <div className="bg-[#1A3A6E] text-white px-4 py-3 rounded-lg shadow-lg max-w-sm mx-auto">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="relative">
              <Smartphone size={24} className="text-white" />
              <RotateCcw size={12} className="absolute -top-1 -right-1 text-[#F26522]" />
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">
              Rotate your device to landscape for better certificate viewing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrientationGuide;
