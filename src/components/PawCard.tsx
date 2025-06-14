
import React from 'react';

interface PawCardProps {
  balance: number;
  memberTier: string;
}

const PawCard = ({ balance, memberTier }: PawCardProps) => {
  return (
    <div className="relative w-80 h-48 transform hover:scale-105 transition-all duration-300">
      {/* Using the uploaded debit card image */}
      <div className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden">
        <img 
          src="/lovable-uploads/6fa5ee04-e79e-49fb-82ba-74284debea0c.png" 
          alt="Crypdawgs Debit Card"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Card Content Overlay */}
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
