
import React, { useState } from 'react';

interface PawCardProps {
  balance: number;
  memberTier: string;
}

const PawCard = ({ balance, memberTier }: PawCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-80 h-48 perspective-1000">
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleCardFlip}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl shadow-2xl overflow-hidden">
          <img 
            src="/lovable-uploads/465e64f1-4ce2-464a-8f88-560ba4cb0ced.png" 
            alt="Crypdawgs Debit Card"
            className="w-full h-full object-cover"
          />
          
          {/* Subtle overlay for tap hint */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-800 font-medium">
              Tap to flip
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
          {/* Magnetic stripe */}
          <div className="w-full h-12 bg-gray-800 mt-6"></div>
          
          {/* Card Details */}
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-300 uppercase tracking-wider">Card Holder</p>
                <p className="text-sm font-bold">VAULT MEMBER</p>
                <p className="text-xs text-purple-300">{memberTier} TIER</p>
              </div>
              <div className="text-right">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                  CD
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-gray-300">Card Number</p>
              <p className="text-sm font-mono tracking-wider">•••• •••• •••• 2044</p>
            </div>
            
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-gray-300">Expires</p>
                <p className="text-sm font-medium">12/28</p>
              </div>
              <div>
                <p className="text-xs text-gray-300">CVV</p>
                <p className="text-sm font-medium">•••</p>
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-700">
              <p className="text-xs text-gray-400">CrypDNA Vault Access</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded"></div>
                <p className="text-xs text-purple-300 font-medium">Verified Member</p>
              </div>
            </div>
          </div>

          {/* Holographic effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent transform skew-x-12 -translate-x-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PawCard;
