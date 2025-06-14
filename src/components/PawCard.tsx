
import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

interface PawCardProps {
  memberName?: string;
  cardLast4?: string;
  fullCardNumber?: string; // e.g. "4242 2044 0000 9911"
  expDate?: string; // e.g. "12/28"
}

const formatCardNumber = (num?: string) => {
  if (!num) return "4242 2044 0000 9911";
  return num.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

const PawCard = ({
  memberName = "VAULT MEMBER",
  cardLast4 = "2044",
  fullCardNumber,
  expDate = "12/28",
}: PawCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Fallback to a default number if not provided
  const fullNum = fullCardNumber
    ? formatCardNumber(fullCardNumber)
    : "4242 2044 0000 9911";

  return (
    <div className="relative w-80 h-48 perspective-1000 select-none">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={() => setIsFlipped((f) => !f)}
        tabIndex={0}
        aria-label="Flip card"
      >
        {/* FRONT OF CARD */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl shadow-lg overflow-hidden"
             style={{
               background: '#111214', // luxury matte black
               boxShadow: '0 4px 16px 0 rgba(15,16,20,0.09)'
             }}
        >
          {/* Subtle embossed paw print watermark (SVG, top-right on desktop, center on small) */}
          <div className="absolute top-4 right-4 md:top-3 md:right-3 opacity-10 pointer-events-none z-0">
            <svg
              width="48" height="48"
              viewBox="0 0 48 48"
              fill="none"
              aria-hidden="true"
            >
              <ellipse cx="24" cy="30" rx="12" ry="11" fill="#fff" fillOpacity="0.27"/>
              <ellipse cx="13" cy="18" rx="5" ry="6" fill="#fff" fillOpacity="0.22"/>
              <ellipse cx="24" cy="12.5" rx="4.5" ry="5" fill="#fff" fillOpacity="0.25"/>
              <ellipse cx="35" cy="17.5" rx="5" ry="6" fill="#fff" fillOpacity="0.22"/>
              <ellipse cx="10.3" cy="29.7" rx="3" ry="3" fill="#fff" fillOpacity="0.18"/>
              <ellipse cx="37.7" cy="28.9" rx="2.8" ry="2.9" fill="#fff" fillOpacity="0.15"/>
            </svg>
          </div>
          {/* Smart chip icon, top-left */}
          <div className="absolute top-4 left-5 flex items-center z-10">
            <CreditCard size={32} color="#BBB" strokeWidth={1.5} className="opacity-70" />
          </div>
          {/* Member Name - centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <span
              className="font-bold text-white text-xl md:text-2xl tracking-wide"
              style={{
                fontFamily: 'system-ui, sans-serif',
                letterSpacing: '0.07em',
                textShadow: `
                  0 0 7px #6665, 
                  0 0 18px #fff2, 
                  0 1.5px 0 #232323
                `,
                filter: 'brightness(1.25)',
              }}
            >
              {memberName || "VAULT MEMBER"}
            </span>
          </div>
          {/* Crypdawgs Debit Label, bottom-right */}
          <div className="absolute bottom-3 right-5 flex flex-col items-end z-10">
            <span
              className="text-white text-[0.82rem] uppercase tracking-[0.20em] font-extrabold opacity-75"
              style={{
                fontFamily: 'system-ui, sans-serif',
                letterSpacing: '0.22em',
                textShadow: '0 0 2px #aaa9, 0 0 8px #4442',
                fontSize: '0.83rem'
              }}
            >
              Crypdawgs™
            </span>
            <span className="text-gray-300 text-xs tracking-widest font-bold opacity-75">
              DEBIT
            </span>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl shadow-lg"
             style={{
               background: '#181819',
               boxShadow: '0 4px 16px 0 rgba(15,16,20,0.10)'
             }}
        >
          {/* Black magnetic stripe */}
          <div className="absolute top-5 left-0 w-full h-6 bg-black/85" />
          {/* White signature field */}
          <div className="absolute top-16 left-7 h-5 w-44 bg-white/90 rounded-[3px] shadow-inner flex items-center px-2 text-xs text-gray-500 font-mono">
            {/* Optionally: "AUTHORIZED SIGNATURE", but leave blank for minimal look */}
          </div>
          {/* Card number - centered */}
          <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[90%] flex flex-col items-center z-10">
            <span
              className="font-mono text-xl md:text-2xl tracking-wider text-white drop-shadow-[0_0_7px_rgba(255,255,255,0.17)]"
              style={{
                fontWeight: 700,
                textShadow: '0 0 6px #cfd4ed22, 0 1.5px 0 #3332',
                letterSpacing: '0.17em'
              }}
            >
              {fullNum}
            </span>
          </div>
          {/* Expiry, bottom-left */}
          <div className="absolute bottom-6 left-7 text-xs text-gray-200 font-semibold">
            Exp: {expDate || "12/28"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PawCard;
