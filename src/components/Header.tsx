import React from 'react';
import logoImage from '../assets/LSFCU_White.png';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-start">
          <img 
            src={logoImage} 
            alt="Lions Share Federal Credit Union" 
            className="h-20"
          />
        </div>
      </div>
    </header>
  );
};