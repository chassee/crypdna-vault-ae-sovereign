import React, { useState } from 'react';

/**
 * VaultIdentityCardPreview - Shows a styled mock CrypDNA Identity Card
 * 
 * Purpose: Visual preview of what a vault identity card looks like
 * Features: Flippable 3D card with front/back design, placeholder data
 * Status: Visual prototype only - no real user data, no queries
 */
export default function VaultIdentityCardPreview() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Placeholder/mock data
  const mockCardData = {
    name: 'Guest User',
    memberId: 'CRYP-XXXX-XXXX',
    tier: 'Initiate',
    joinDate: 'Oct 2025',
    dnaScore: '---',
    creditLimit: '$---',
    validThru: '--/--',
    cardNumber: '**** **** **** ****'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Your Identity Card
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            This is what your CrypDNA Vault identity card will look like once you complete verification
          </p>
        </div>

        {/* 3D Card Container */}
        <div className="perspective-1000">
          <div 
            className={`relative w-full aspect-[1.6/1] transition-transform duration-700 transform-style-3d cursor-pointer ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Front of Card */}
            <div className="absolute inset-0 backface-hidden">
              <div className="w-full h-full p-8 bg-gradient-to-br from-card via-card to-primary/20 border border-primary/30 rounded-3xl shadow-2xl shadow-primary/20 backdrop-blur-sm">
                {/* Card Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary via-accent to-primary/50 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 2L18 2L22 6L18 10L16 12L18 14L22 18L18 22L6 22L2 18L6 14L8 12L6 10L2 6L6 2Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-black text-foreground">CrypDNA</p>
                      <p className="text-xs text-muted-foreground">Vault Identity</p>
                    </div>
                  </div>
                  
                  <div className="px-3 py-1 bg-gradient-to-r from-gray-400/20 to-gray-500/20 border border-gray-400/30 rounded-full">
                    <span className="text-xs font-bold text-foreground">{mockCardData.tier}</span>
                  </div>
                </div>

                {/* Card Chip */}
                <div className="mb-6">
                  <div className="w-14 h-11 bg-gradient-to-br from-amber-300 to-amber-500 rounded-lg border-2 border-amber-600/50 shadow-lg">
                    <div className="grid grid-cols-3 gap-0.5 p-1.5 h-full">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="bg-amber-600/40 rounded-sm" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Number */}
                <div className="mb-6">
                  <p className="text-2xl font-mono font-bold text-foreground/80 tracking-wider">
                    {mockCardData.cardNumber}
                  </p>
                </div>

                {/* Cardholder Info */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">Cardholder</p>
                    <p className="text-lg font-bold text-foreground">{mockCardData.name}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground font-medium mb-1">Valid Thru</p>
                    <p className="text-base font-bold text-foreground">{mockCardData.validThru}</p>
                  </div>
                </div>

                {/* Tap to flip hint */}
                <div className="absolute bottom-4 right-4">
                  <div className="flex items-center space-x-2 text-muted-foreground/50">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
                    </svg>
                    <span className="text-xs">Tap to flip</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Back of Card */}
            <div className="absolute inset-0 backface-hidden rotate-y-180">
              <div className="w-full h-full bg-gradient-to-br from-card via-card to-accent/20 border border-accent/30 rounded-3xl shadow-2xl shadow-accent/20 backdrop-blur-sm overflow-hidden">
                {/* Magnetic Strip */}
                <div className="w-full h-16 bg-gradient-to-r from-gray-700 to-gray-900 mt-8" />
                
                {/* CVV & Signature */}
                <div className="p-8 space-y-6">
                  <div className="flex justify-end">
                    <div className="w-24 h-12 bg-white/90 rounded flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-800">***</span>
                    </div>
                  </div>

                  {/* Identity Stats */}
                  <div className="space-y-4 pt-4">
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg border border-border/50">
                      <span className="text-sm text-muted-foreground">DNA Score</span>
                      <span className="text-lg font-bold text-foreground">{mockCardData.dnaScore}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg border border-border/50">
                      <span className="text-sm text-muted-foreground">Credit Limit</span>
                      <span className="text-lg font-bold text-primary">{mockCardData.creditLimit}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg border border-border/50">
                      <span className="text-sm text-muted-foreground">Member Since</span>
                      <span className="text-sm font-bold text-foreground">{mockCardData.joinDate}</span>
                    </div>
                  </div>

                  {/* Member ID */}
                  <div className="pt-4 border-t border-border/30">
                    <p className="text-xs text-muted-foreground mb-1">Member ID</p>
                    <p className="text-sm font-mono font-bold text-foreground">{mockCardData.memberId}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-card/50 border border-border/50 rounded-xl backdrop-blur-sm text-center space-y-2">
            <svg className="w-8 h-8 text-primary mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1Z" />
            </svg>
            <h3 className="text-sm font-bold text-foreground">Verified Identity</h3>
            <p className="text-xs text-muted-foreground">Blockchain-secured credentials</p>
          </div>
          
          <div className="p-6 bg-card/50 border border-border/50 rounded-xl backdrop-blur-sm text-center space-y-2">
            <svg className="w-8 h-8 text-accent mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 17H22V19H2V17M1.15 12.15L4 15L1.15 17.85L2.85 19.55L7.4 15L2.85 10.45L1.15 12.15M8 5H10V7H12V9H10V7H8V5Z" />
            </svg>
            <h3 className="text-sm font-bold text-foreground">Instant Access</h3>
            <p className="text-xs text-muted-foreground">Use anywhere, anytime</p>
          </div>
          
          <div className="p-6 bg-card/50 border border-border/50 rounded-xl backdrop-blur-sm text-center space-y-2">
            <svg className="w-8 h-8 text-primary mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
            </svg>
            <h3 className="text-sm font-bold text-foreground">Prestige Status</h3>
            <p className="text-xs text-muted-foreground">Unlock exclusive rewards</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-2xl">
          <h3 className="text-2xl font-black text-foreground mb-3">Ready for Your Card?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Complete verification to receive your personalized CrypDNA identity card
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all">
            Start Verification
          </button>
        </div>
      </div>
    </div>
  );
}
