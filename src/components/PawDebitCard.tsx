import React, { useState, useRef } from 'react';

interface PawDebitCardProps {
  userName: string;
  vaultId: string;
  crypDnaScore?: number;
  cardLastFour?: string;
  cardBrand?: string;
}

const PawDebitCard: React.FC<PawDebitCardProps> = ({
  userName,
  vaultId,
  crypDnaScore = 700,
  cardLastFour = "****",
  cardBrand = "VAULT"
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<{transform?: string; transition?: string}>({});
  const cardRef = useRef<HTMLDivElement>(null);

  // Dynamic glow color based on CrypDNA score
  const getGlowColor = (score: number) => {
    if (score >= 800) return 'shadow-[0_0_30px_hsl(var(--luxury-gold)/0.6)]';
    if (score >= 750) return 'shadow-[0_0_30px_hsl(var(--luxury-purple)/0.6)]';
    return 'shadow-[0_0_30px_hsl(142_76%_36%/0.6)]'; // Green
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;

    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    });
  };

  const playPawTapSound = () => {
    if (typeof Audio !== 'undefined') {
      try {
        // Create a more authentic paw tap sound
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (e) {
        console.log('Audio not supported');
      }
    }
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    playPawTapSound();
  };

  const cardNumber = `**** **** **** ${cardLastFour}`;
  const expiryDate = '••/••'; // Never expose real expiry dates

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="perspective-1000">
        <div
          ref={cardRef}
          className={`relative w-full h-64 cursor-pointer transform-style-preserve-3d luxury-transition ${getGlowColor(crypDnaScore)} ${
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
          {/* Front of Card - Paw Shape */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="relative w-full h-full">
              {/* Paw-shaped card background */}
              <svg 
                viewBox="0 0 400 256" 
                className="w-full h-full"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
              >
                <defs>
                  <linearGradient id="pawGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a1a1a" />
                    <stop offset="50%" stopColor="#2d2d2d" />
                    <stop offset="100%" stopColor="#0a0a0a" />
                  </linearGradient>
                  <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                    <stop offset="100%" stopColor="transparent" />
                    <animateTransform
                      attributeName="gradientTransform"
                      type="translate"
                      values="-200 0;400 0;-200 0"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </linearGradient>
                </defs>
                
                {/* Paw shape path */}
                <path
                  d="M 80 40 
                     C 80 20, 100 20, 120 40
                     L 120 80
                     C 120 100, 140 100, 160 80
                     L 160 40
                     C 160 20, 180 20, 200 40
                     L 200 80
                     C 200 100, 220 100, 240 80
                     L 240 40
                     C 240 20, 260 20, 280 40
                     L 280 120
                     C 280 140, 300 140, 320 120
                     L 320 180
                     C 320 200, 300 220, 280 220
                     L 120 220
                     C 100 220, 80 200, 80 180
                     Z"
                  fill="url(#pawGradient)"
                  stroke="url(#shimmer)"
                  strokeWidth="2"
                />
                
                {/* Metallic shimmer overlay */}
                <path
                  d="M 80 40 
                     C 80 20, 100 20, 120 40
                     L 120 80
                     C 120 100, 140 100, 160 80
                     L 160 40
                     C 160 20, 180 20, 200 40
                     L 200 80
                     C 200 100, 220 100, 240 80
                     L 240 40
                     C 240 20, 260 20, 280 40
                     L 280 120
                     C 280 140, 300 140, 320 120
                     L 320 180
                     C 320 200, 300 220, 280 220
                     L 120 220
                     C 100 220, 80 200, 80 180
                     Z"
                  fill="url(#shimmer)"
                />
              </svg>

              {/* Card content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                {/* Top section */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${getGlowColor(crypDnaScore)} bg-gradient-to-br from-luxury-purple to-luxury-gold`}>
                      <span className="text-2xl">🐾</span>
                    </div>
                    <div>
                      <div className="text-white/90 text-sm font-bold">CrypDNA</div>
                      <div className="text-white/70 text-xs">VAULT CARD</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/60 text-xs">SCORE</div>
                    <div className="text-white font-bold">{crypDnaScore}</div>
                  </div>
                </div>

                {/* Middle section - Card number */}
                <div className="space-y-2">
                  <div className="text-white text-lg font-mono tracking-widest">
                    {cardNumber}
                  </div>
                </div>

                {/* Bottom section */}
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-wide">CARDHOLDER</div>
                    <div className="text-white text-sm font-medium uppercase tracking-wide">
                      {userName}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-wide">EXPIRES</div>
                    <div className="text-white text-sm font-mono">{expiryDate}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back of Card */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="relative w-full h-full">
              {/* Same paw shape for back */}
              <svg viewBox="0 0 400 256" className="w-full h-full">
                <path
                  d="M 80 40 
                     C 80 20, 100 20, 120 40
                     L 120 80
                     C 120 100, 140 100, 160 80
                     L 160 40
                     C 160 20, 180 20, 200 40
                     L 200 80
                     C 200 100, 220 100, 240 80
                     L 240 40
                     C 240 20, 260 20, 280 40
                     L 280 120
                     C 280 140, 300 140, 320 120
                     L 320 180
                     C 320 200, 300 220, 280 220
                     L 120 220
                     C 100 220, 80 200, 80 180
                     Z"
                  fill="url(#pawGradient)"
                />
              </svg>

              {/* Back content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                {/* Magnetic stripe simulation */}
                <div className="mt-8 h-12 bg-gradient-to-r from-gray-800 to-gray-600 rounded" />
                
                {/* CVV area */}
                <div className="flex justify-end mb-8">
                  <div className="w-16 h-8 bg-white rounded flex items-center justify-center">
                    <span className="text-black text-sm font-mono">***</span>
                  </div>
                </div>

                {/* Vault info */}
                <div className="space-y-4">
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-wide mb-1">VAULT ID</div>
                    <div className="text-white text-sm font-mono">{vaultId}</div>
                  </div>
                  
                  <div className="text-white/40 text-xs">
                    Secured by CrypDNA biometric encryption and paw-print authentication.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">🐾 Tap paw to flip • Hover for Apple Pay-style tilt</p>
      </div>
    </div>
  );
};

export default PawDebitCard;