import React, { useState } from 'react';

/**
 * ReferralKeyGate - Referral code input screen
 * 
 * Purpose: Allow users to enter a referral code to unlock benefits
 * Features: Code input field with fake validation, visual feedback
 * Status: Visual prototype only - no API calls, no real validation
 */
export default function ReferralKeyGate() {
  const [referralCode, setReferralCode] = useState('');
  const [validationState, setValidationState] = useState(null); // null, 'validating', 'valid', 'invalid'

  const handleValidate = () => {
    if (!referralCode) return;

    setValidationState('validating');
    
    // Fake validation - accepts any code with "CRYP" prefix
    setTimeout(() => {
      if (referralCode.toUpperCase().startsWith('CRYP')) {
        setValidationState('valid');
      } else {
        setValidationState('invalid');
      }
    }, 1500);
  };

  const handleSkip = () => {
    console.log('Skip referral - navigation not yet implemented');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 p-8">
      <div className="w-full max-w-lg space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-accent via-primary to-accent/50 rounded-2xl flex items-center justify-center shadow-2xl shadow-accent/30">
              <svg className="w-10 h-10 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 8H17V6C17 3.24 14.76 1 12 1S7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8M12 17C10.9 17 10 16.1 10 15S10.9 13 12 13 14 13.9 14 15 13.1 17 12 17M15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9S15.1 4.29 15.1 6V8Z" />
              </svg>
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-black bg-gradient-to-r from-foreground via-accent to-primary bg-clip-text text-transparent">
              Referral Access Key
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Enter your exclusive referral code to unlock premium benefits and accelerate your tier progression
            </p>
          </div>
        </div>

        {/* Input Card */}
        <div className="p-8 bg-card/50 border border-border rounded-2xl backdrop-blur-sm space-y-6">
          <div className="space-y-4">
            <label className="text-base font-bold text-foreground">
              Referral Code
            </label>
            
            <div className="relative">
              <input
                type="text"
                value={referralCode}
                onChange={(e) => {
                  setReferralCode(e.target.value.toUpperCase());
                  setValidationState(null);
                }}
                placeholder="CRYP-XXXX-XXXX"
                className={`w-full px-6 py-4 text-lg bg-background border-2 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-4 transition-all font-mono ${
                  validationState === 'valid' 
                    ? 'border-green-500 focus:ring-green-500/20' 
                    : validationState === 'invalid'
                    ? 'border-destructive focus:ring-destructive/20'
                    : 'border-border focus:ring-primary/20 focus:border-primary'
                }`}
                disabled={validationState === 'validating'}
                maxLength={16}
              />
              
              {validationState === 'validating' && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              
              {validationState === 'valid' && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </div>
                </div>
              )}
              
              {validationState === 'invalid' && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center shadow-lg shadow-destructive/50">
                    <svg className="w-5 h-5 text-destructive-foreground" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {validationState === 'invalid' && (
              <p className="text-sm text-destructive flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <span>Invalid referral code. Please check and try again.</span>
              </p>
            )}

            {validationState === 'valid' && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span className="font-semibold">Referral code verified! Unlocking bonuses...</span>
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleValidate}
            disabled={!referralCode || validationState === 'validating' || validationState === 'valid'}
            className="w-full py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground text-lg font-bold rounded-xl transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
          >
            {validationState === 'validating' ? 'Validating...' : validationState === 'valid' ? 'Verified ✓' : 'Validate Code'}
          </button>
        </div>

        {/* Benefits Preview */}
        <div className="p-6 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-xl space-y-4">
          <p className="text-sm font-bold text-foreground uppercase tracking-wider">Referral Benefits</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
              </svg>
              <span className="text-sm text-foreground">+500 XP Bonus</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 14L12 9L17 14H7Z" />
              </svg>
              <span className="text-sm text-foreground">Tier Skip Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1Z" />
              </svg>
              <span className="text-sm text-foreground">Premium Card Design</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44 17.1 8.63 16.18 8.52 15H6.32C6.44 17.19 8.08 18.42 10 18.83V21H13V18.85C14.95 18.48 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.49 11.8 10.9Z" />
              </svg>
              <span className="text-sm text-foreground">+$200 Credit</span>
            </div>
          </div>
        </div>

        {/* Skip Option */}
        <div className="text-center">
          <button
            onClick={handleSkip}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            Skip for now →
          </button>
        </div>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            Don't have a referral code? You can still join and earn rewards later.
          </p>
        </div>
      </div>
    </div>
  );
}
