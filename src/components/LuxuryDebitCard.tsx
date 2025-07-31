import React, { useState, useRef } from 'react';

interface LuxuryDebitCardProps {
  userName: string;
  cardNumber?: string;
  expiryDate?: string;
  vaultId: string;
}

const LuxuryDebitCard: React.FC<LuxuryDebitCardProps> = ({
  userName,
  cardNumber = '**** **** **** 1234',
  expiryDate = '12/27',
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
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.3s ease-out'
    });
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    // Add soft chime sound effect
    if (typeof Audio !== 'undefined') {
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBz2QzfLNeSsFJIHK8d2ORg0PVqzh7KtWFQo8lNvxuVkZCjWR1fLZfS4HKHvL8uGLRg0PUqzj6qpYFAo8ldxwuFYYCzTZ1fLZfSwGKH7L8uCLRg0PV6zh7K0');
        audio.volume = 0.1;
        audio.play().catch(() => {});
      } catch (e) {}
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="perspective-1000">
        <div
          ref={cardRef}
          className={`relative w-full h-56 cursor-pointer transform-style-preserve-3d luxury-transition ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            ...tiltStyle,
            transform: `${tiltStyle.transform || ''} rotateY(${isFlipped ? 180 : 0}deg)`,
            transition: 'transform 0.6s ease-in-out'
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleCardClick}
        >
          {/* Front of Card */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-luxury-charcoal via-gray-900 to-black relative">
              {/* Metallic shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer bg-[length:200%_100%]" />
              
              {/* Glowing paw icon */}
              <div className="absolute top-6 left-6">
                <div className="w-12 h-12 bg-luxury-purple rounded-full flex items-center justify-center shadow-glow">
                  <span className="text-white text-xl font-bold">🐾</span>
                </div>
              </div>

              {/* CrypDNA branding */}
              <div className="absolute top-6 right-6">
                <div className="text-white/80 text-sm font-medium">CrypDNA</div>
                <div className="text-white/60 text-xs">VAULT</div>
              </div>

              {/* Card number */}
              <div className="absolute bottom-20 left-6 right-6">
                <div className="text-white text-lg font-mono tracking-widest mb-2">
                  {cardNumber}
                </div>
              </div>

              {/* User name and expiry */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
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

              {/* Premium accents */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-luxury-purple to-luxury-gold" />
            </div>
          </div>

          {/* Back of Card */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-luxury-charcoal via-gray-900 to-black relative">
              {/* Magnetic stripe */}
              <div className="absolute top-8 left-0 right-0 h-12 bg-gradient-to-r from-gray-800 to-gray-700" />
              
              {/* CVV area */}
              <div className="absolute top-24 right-6 w-16 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-black text-sm font-mono">***</span>
              </div>

              {/* Vault ID */}
              <div className="absolute bottom-20 left-6 right-6">
                <div className="text-white/60 text-xs uppercase tracking-wide mb-1">VAULT ID</div>
                <div className="text-white text-sm font-mono">{vaultId}</div>
              </div>

              {/* Security features */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-white/40 text-xs">
                  This card is protected by advanced encryption and biometric security.
                </div>
              </div>

              {/* Premium accents */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-luxury-gold to-luxury-purple" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">Tap card to flip • Hover for tilt effect</p>
      </div>
    </div>
  );
};

export default LuxuryDebitCard;