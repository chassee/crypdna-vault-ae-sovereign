import React from 'react';

/**
 * PrestigeRankIntro - Explains the prestige ranking system
 * 
 * Purpose: Introduce users to tier progression and identity status
 * Features: Static progress bar, tier descriptions, visual hierarchy
 * Status: Visual prototype only - no real data or progression logic
 */
export default function PrestigeRankIntro() {
  const tiers = [
    {
      name: 'Initiate',
      level: 1,
      color: 'from-gray-400 to-gray-500',
      glowColor: 'shadow-gray-500/30',
      description: 'Your journey begins here',
      benefits: ['Basic identity card', 'Access to vault dashboard', 'Community forums']
    },
    {
      name: 'Verified',
      level: 2,
      color: 'from-blue-400 to-blue-500',
      glowColor: 'shadow-blue-500/30',
      description: 'Identity verified and trusted',
      benefits: ['Enhanced credit limits', 'Priority support', 'Referral rewards']
    },
    {
      name: 'Elite',
      level: 3,
      color: 'from-purple-400 to-purple-500',
      glowColor: 'shadow-purple-500/30',
      description: 'Premium status unlocked',
      benefits: ['VIP credit lines', 'Exclusive events', 'Premium card design']
    },
    {
      name: 'Legend',
      level: 4,
      color: 'from-amber-400 to-amber-500',
      glowColor: 'shadow-amber-500/30',
      description: 'The pinnacle of prestige',
      benefits: ['Unlimited credit access', 'Concierge service', 'Diamond card']
    }
  ];

  const currentTier = 1; // Mock current tier (Initiate)
  const progress = 35; // Mock progress percentage

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Prestige Ranking System
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your identity status determines your access level, credit limits, and exclusive rewards. 
            Build your reputation to climb the ranks.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="p-8 bg-card/50 border border-border rounded-2xl backdrop-blur-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Current Rank</p>
              <h2 className="text-3xl font-black bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">
                Initiate
              </h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground font-medium">Progress to Verified</p>
              <p className="text-2xl font-bold text-primary">{progress}%</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-4 bg-muted/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 shadow-lg shadow-primary/50"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="absolute -top-1 left-0 right-0 flex justify-between px-1">
              {tiers.map((tier, index) => (
                <div 
                  key={tier.level}
                  className={`w-6 h-6 rounded-full border-4 border-background flex items-center justify-center transition-all ${
                    index < currentTier 
                      ? 'bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/50' 
                      : 'bg-muted'
                  }`}
                >
                  {index < currentTier && (
                    <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground font-medium px-1">
            {tiers.map((tier) => (
              <span key={tier.level}>{tier.name}</span>
            ))}
          </div>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tiers.map((tier) => (
            <div 
              key={tier.level}
              className={`p-6 bg-card border rounded-2xl backdrop-blur-sm transition-all hover:scale-[1.02] ${
                tier.level === currentTier 
                  ? 'border-primary shadow-xl shadow-primary/20' 
                  : 'border-border/50'
              }`}
            >
              <div className="space-y-4">
                {/* Tier Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${tier.color} rounded-xl flex items-center justify-center shadow-lg ${tier.glowColor}`}>
                      <span className="text-2xl font-black text-white">{tier.level}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-foreground">{tier.name}</h3>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>
                  </div>
                  {tier.level === currentTier && (
                    <div className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full">
                      <span className="text-xs font-bold text-primary">Active</span>
                    </div>
                  )}
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Benefits</p>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-foreground">
                        <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-2xl">
          <h3 className="text-2xl font-black text-foreground mb-3">Ready to Advance?</h3>
          <p className="text-muted-foreground mb-6">
            Complete verification and referral challenges to unlock higher tiers
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all">
            View Challenges
          </button>
        </div>
      </div>
    </div>
  );
}
