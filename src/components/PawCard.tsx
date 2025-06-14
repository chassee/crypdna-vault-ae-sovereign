
import React, { useState } from 'react';

interface PawCardProps {
  balance: number;
  memberTier: string;
  memberName?: string;
  cardLast4?: string;
  expDate?: string;
  cvv?: string;
}

const PawCard = ({
  balance,
  memberTier,
  memberName = "VAULT MEMBER",
  cardLast4 = "2044",
  expDate = "12/28",
  cvv = "428",
}: PawCardProps) => {
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
          
          {/* Digital name glow */}
          <div className="absolute left-5 top-5 z-10">
            <span className="font-bold text-white text-lg tracking-wide drop-shadow-[0_0_8px_rgba(93,72,255,0.30)] shadow-purple-400/60 transition-all duration-300 select-none">
              {memberName || "VAULT MEMBER"}
            </span>
            <div className="absolute left-0 top-0 w-full h-full rounded bg-purple-500/10 blur-[6px] -z-10"></div>
          </div>
          
          {/* Card number, bottom center */}
          <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center w-full">
            <span className="font-[900] text-[1.2rem] md:text-[1.4rem] tracking-widest text-gray-200 font-mono drop-shadow-[0_0_14px_rgba(87,191,255,0.22)] select-none">
              **** **** **** {cardLast4}
            </span>
          </div>
          
          {/* Exp + CVV, bottom-right */}
          <div className="absolute bottom-5 right-6 flex flex-col items-end space-y-1">
            <span className="text-xs text-slate-300 font-semibold tracking-wider">
              Expires {expDate}
            </span>
            <span className="text-xs text-slate-400 font-semibold tracking-wider backdrop-blur-sm px-2 py-0.5 rounded bg-black/30 blur-[0.5px]">
              CVV: <span className="blur-sm select-none">{cvv}</span>
            </span>
          </div>

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
          <div className="w-full h-10 bg-gray-800 mt-4"></div>
          
          {/* Card Details - minimal back layout */}
          <div className="p-5 space-y-4 flex flex-col justify-center h-full pt-2">
            {/* User's Name */}
            <div className="text-center">
              <p className="text-lg font-bold">{memberName || "VAULT MEMBER"}</p>
            </div>
            
            {/* Card Number */}
            <div className="text-center">
              <p className="text-sm font-mono tracking-wider">**** **** **** {cardLast4}</p>
            </div>
            
            {/* Expiration Date */}
            <div className="text-center">
              <p className="text-sm font-medium">Expires {expDate}</p>
            </div>
            
            <div className="pt-2 border-t border-gray-700 text-center">
              <p className="text-xs text-gray-400">CrypDNA Vault Access</p>
              <div className="flex items-center justify-center space-x-2 mt-1">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded"></div>
                <p className="text-xs text-purple-300 font-medium">Verified Member</p>
              </div>
            </div>
          </div>
          {/* Holographic glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent transform skew-x-12 -translate-x-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PawCard;

