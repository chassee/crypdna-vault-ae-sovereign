
import React from 'react';

interface PawCardProps {
  balance: number;
  memberTier: string;
}

const PawCard = ({ balance, memberTier }: PawCardProps) => {
  return (
    <div className="relative w-80 h-48 transform hover:scale-105 transition-all duration-300">
      {/* Card Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl"></div>
      </div>
      
      {/* Card Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-gray-300 uppercase tracking-wider">Crypdawgs</p>
            <p className="text-lg font-bold">VAULT CARD</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-300">{memberTier}</p>
            <div className="w-12 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded mt-1"></div>
          </div>
        </div>
        
        {/* Paw Print Design */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
          <div className="relative w-16 h-16">
            {/* Main paw pad */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-white rounded-full"></div>
            {/* Toe pads */}
            <div className="absolute top-0 left-2 w-3 h-4 bg-white rounded-full"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-white rounded-full"></div>
            <div className="absolute top-0 right-2 w-3 h-4 bg-white rounded-full"></div>
            <div className="absolute top-2 left-6 w-2 h-3 bg-white rounded-full"></div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div>
          <div className="mb-3">
            <p className="text-xs text-gray-300">BALANCE</p>
            <p className="text-2xl font-bold">${balance.toLocaleString()}</p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-gray-300">CARD HOLDER</p>
              <p className="text-sm font-medium">VAULT MEMBER</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-300">EXPIRES</p>
              <p className="text-sm font-medium">12/28</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Holographic effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 transform skew-x-12 -translate-x-full animate-pulse rounded-2xl"></div>
    </div>
  );
};

export default PawCard;
