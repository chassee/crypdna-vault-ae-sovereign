import React from 'react';

const LuxuryLoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center animate-fade-in">
        {/* Animated Paw Logo */}
        <div className="mb-8 relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-luxury-purple to-luxury-gold rounded-full flex items-center justify-center shadow-glow paw-spinner">
            <span className="text-3xl">🐾</span>
          </div>
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-luxury-purple rounded-full animate-pulse"
              style={{
                left: `${50 + Math.cos((i * 60) * Math.PI / 180) * 40}%`,
                top: `${50 + Math.sin((i * 60) * Math.PI / 180) * 40}%`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <div className="animate-slide-up">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent mb-2">
            CrypDNA Vault
          </h2>
          <p className="text-muted-foreground">Securing your financial future...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-muted rounded-full mx-auto mt-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-luxury-purple to-luxury-gold animate-shimmer bg-[length:200%_100%]" />
        </div>
      </div>
    </div>
  );
};

export default LuxuryLoadingScreen;