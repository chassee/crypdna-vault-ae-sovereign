
import React, { useState } from 'react';

interface PawCardProps {
  memberName?: string;
  cardLast4?: string;
  fullCardNumber?: string; // e.g. "4242 2044 0000 9911"
  expDate?: string; // e.g. "12/28"
}

const formatCardNumber = (num?: string) => {
  if (!num) return "4242 2044 0000 9912";
  return num.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

const PawCard = ({
  memberName = "PARRIS JOHNSON",
  cardLast4 = "2044",
  fullCardNumber,
  expDate = "12/28",
}: PawCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Fallback to a default number if not provided
  const fullNum = fullCardNumber
    ? formatCardNumber(fullCardNumber)
    : "4242 2044 0000 9912";

  return (
    <div className="relative w-80 h-48 perspective-1000 select-none">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={() => setIsFlipped((f) => !f)}
        tabIndex={0}
        aria-label="Flip card"
      >
        {/* FRONT OF CARD - Pure minimalist black */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl shadow-xl overflow-hidden"
             style={{
               background: '#0a0a0a', // Pure matte black
               boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
             }}
        >
          {/* Large centered paw print silhouette - embossed and surreal */}
          <div className="absolute inset-0 flex items-center justify-center opacity-15">
            <svg
              width="120" height="120"
              viewBox="0 0 120 120"
              fill="none"
              aria-hidden="true"
              className="drop-shadow-2xl"
            >
              {/* Main paw pad - larger and more stylized */}
              <ellipse cx="60" cy="75" rx="28" ry="25" fill="#1a1a1a" fillOpacity="0.8"/>
              
              {/* Toe pads - arranged in artistic formation */}
              <ellipse cx="35" cy="45" rx="12" ry="14" fill="#1a1a1a" fillOpacity="0.7"/>
              <ellipse cx="60" cy="35" rx="11" ry="13" fill="#1a1a1a" fillOpacity="0.75"/>
              <ellipse cx="85" cy="44" rx="12" ry="14" fill="#1a1a1a" fillOpacity="0.7"/>
              
              {/* Side detail pads for surreal effect */}
              <ellipse cx="25" cy="70" rx="8" ry="9" fill="#1a1a1a" fillOpacity="0.5"/>
              <ellipse cx="95" cy="69" rx="7" ry="8" fill="#1a1a1a" fillOpacity="0.5"/>
            </svg>
          </div>
        </div>

        {/* BACK OF CARD - Clean white with sharp contrast */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl shadow-xl overflow-hidden"
             style={{
               background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
               boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
             }}
        >
          {/* Card Number - centered and prominent */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full flex justify-center z-10">
            <span
              className="font-mono text-2xl tracking-[0.2em] text-gray-900"
              style={{
                fontWeight: 300,
                letterSpacing: '0.25em',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              {fullNum}
            </span>
          </div>
          
          {/* Member Name - upper area */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex justify-center z-10">
            <span
              className="text-sm font-light text-gray-700 tracking-[0.15em] uppercase"
              style={{
                fontWeight: 300,
                letterSpacing: '0.2em'
              }}
            >
              {memberName}
            </span>
          </div>
          
          {/* Expiration - bottom right with elegant spacing */}
          <div className="absolute bottom-8 right-8 text-right z-10">
            <div className="text-xs text-gray-500 font-light mb-1 tracking-wider">
              EXPIRES
            </div>
            <div className="text-lg font-light text-gray-900 tracking-widest">
              {expDate}
            </div>
          </div>
          
          {/* Subtle brand mark - bottom left */}
          <div className="absolute bottom-8 left-8 z-10">
            <span
              className="text-xs text-gray-400 font-light tracking-[0.3em] uppercase"
              style={{
                letterSpacing: '0.35em'
              }}
            >
              VAULT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PawCard;
