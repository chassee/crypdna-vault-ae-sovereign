import React, { useState, useRef } from 'react';

interface LuxuryDebitCardProps {
  userName: string;
  vaultId: string;
}

const LuxuryDebitCard: React.FC<LuxuryDebitCardProps> = ({
  userName,
  vaultId
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<{transform?: string; transition?: string}>({});
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;

    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    });
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const cardNumber = '**** **** **** 1234';
  const expiryDate = '12/27';

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="perspective-1000">
        <div
          ref={cardRef}
          className={`relative w-full h-64 cursor-pointer transform-style-preserve-3d luxury-transition amex-card-glow ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            ...tiltStyle,
            transform: `${tiltStyle.transform || ''} rotateY(${isFlipped ? 180 : 0}deg)`,
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleCardClick}
        >
          {/* Front of Card - Matte Black Amex Style */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-2xl border border-white/10 overflow-hidden">
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />
              
              {/* Neon edge glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-sm -z-10" />
              
              {/* Card content */}
              <div className="relative h-full flex flex-col justify-between p-8 text-white">
                {/* Top section */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <span className="text-xl font-bold">C</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-bold tracking-wider">CRYPDNA</div>
                      <div className="text-white/70 text-xs tracking-wider">VAULT ELITE</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/60 text-xs tracking-wider">DNA SCORE</div>
                    <div className="text-white font-bold text-lg">750</div>
                  </div>
                </div>

                {/* Middle section - Card number */}
                <div className="space-y-2">
                  <div className="text-white text-xl font-mono tracking-[0.3em] font-light">
                    {cardNumber}
                  </div>
                </div>

                {/* Bottom section */}
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-wider">CARDHOLDER</div>
                    <div className="text-white text-sm font-medium uppercase tracking-wide">
                      {userName}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-wider">EXPIRES</div>
                    <div className="text-white text-sm font-mono">{expiryDate}</div>
                  </div>
                </div>

                {/* Holographic accent */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" />
              </div>
            </div>
          </div>

          {/* Back of Card */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-black to-slate-800 rounded-2xl border border-white/10 overflow-hidden">
              {/* Back content */}
              <div className="relative h-full flex flex-col justify-between p-8 text-white">
                {/* Magnetic stripe */}
                <div className="mt-6 h-12 bg-gradient-to-r from-gray-700 to-gray-500 rounded" />
                
                {/* CVV area */}
                <div className="flex justify-end mb-6">
                  <div className="w-16 h-8 bg-white rounded flex items-center justify-center">
                    <span className="text-black text-sm font-mono">***</span>
                  </div>
                </div>

                {/* Vault info */}
                <div className="space-y-4">
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-wider mb-1">VAULT ID</div>
                    <div className="text-white text-sm font-mono tracking-wider">{vaultId}</div>
                  </div>
                  
                  <div className="text-white/40 text-xs leading-relaxed">
                    Secured by quantum encryption and biometric authentication. 
                    This card grants access to exclusive financial instruments.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">Tap to flip • Hover for premium tilt effect</p>
      </div>
    </div>
  );
};

export default LuxuryDebitCard;