import React from 'react';

/**
 * GuestLandingScreen - Entry point for Guest Mode
 * 
 * Purpose: Introduces Guest Mode with a clear call-to-action
 * Features: Single primary button to "Enter as Guest"
 * Status: Visual prototype only - no navigation or auth logic attached
 */
export default function GuestLandingScreen() {
  const handleEnterAsGuest = () => {
    console.log('Enter as Guest clicked - navigation not yet implemented');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.1),transparent_50%)]" />
      
      <div className="w-full max-w-2xl p-8 space-y-12 relative z-10">
        {/* Logo & Title */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-primary via-accent to-primary/50 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30">
                <svg className="w-12 h-12 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 2L18 2L22 6L18 10L16 12L18 14L22 18L18 22L6 22L2 18L6 14L8 12L6 10L2 6L6 2Z" />
                </svg>
              </div>
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-accent to-accent/70 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-black bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Welcome to CrypDNA
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-xl mx-auto">
              Experience the future of identity-based credit and prestige ranking
            </p>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-card/50 border border-border/50 rounded-xl backdrop-blur-sm space-y-3 hover:border-primary/50 transition-all">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1Z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-foreground">Identity First</h3>
            <p className="text-sm text-muted-foreground">Your digital DNA unlocks exclusive access</p>
          </div>
          
          <div className="p-6 bg-card/50 border border-border/50 rounded-xl backdrop-blur-sm space-y-3 hover:border-primary/50 transition-all">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 14L12 9L17 14H7Z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-foreground">Prestige Ranks</h3>
            <p className="text-sm text-muted-foreground">Climb tiers to unlock premium rewards</p>
          </div>
          
          <div className="p-6 bg-card/50 border border-border/50 rounded-xl backdrop-blur-sm space-y-3 hover:border-primary/50 transition-all">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 17H22V19H2V17M1.15 12.15L4 15L1.15 17.85L2.85 19.55L7.4 15L2.85 10.45L1.15 12.15M8 5H10V7H12V9H10V7H8V5Z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-foreground">Elite Credit</h3>
            <p className="text-sm text-muted-foreground">Access credit lines backed by your identity</p>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="space-y-4">
          <button
            onClick={handleEnterAsGuest}
            className="w-full py-6 bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-primary-foreground text-xl font-bold rounded-xl transition-all duration-300 shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] flex items-center justify-center space-x-3"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12C14.21 12 16 10.21 16 8S14.21 4 12 4 8 5.79 8 8 9.79 12 12 12M12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
            </svg>
            <span>Enter as Guest</span>
          </button>
          
          <p className="text-center text-sm text-muted-foreground">
            Explore CrypDNA Vault without commitment • No credit card required
          </p>
        </div>

        {/* Footer note */}
        <div className="text-center pt-6 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            Guest Mode is a limited preview. Full access requires membership.
          </p>
        </div>
      </div>
    </div>
  );
}
