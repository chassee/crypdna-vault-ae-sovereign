import React from 'react';

/**
 * TierUnlockRewardsShowcase - Visual showcase of membership tiers & rewards
 * 
 * Purpose: Tease users with premium benefits available at higher tiers
 * Features: Animated tier cards, reward previews, visual progression
 * Status: Visual prototype only - no click-through, no action logic
 */
export default function TierUnlockRewardsShowcase() {
  const tierRewards = [
    {
      tier: 'Initiate',
      level: 1,
      gradient: 'from-gray-400 via-gray-500 to-gray-600',
      shadowColor: 'shadow-gray-500/30',
      unlocked: true,
      rewards: [
        { icon: '🎫', title: 'Basic Identity Card', description: 'Standard vault access' },
        { icon: '💬', title: 'Community Access', description: 'Join member forums' },
        { icon: '📊', title: 'Dashboard Analytics', description: 'Track your progress' },
      ]
    },
    {
      tier: 'Verified',
      level: 2,
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      shadowColor: 'shadow-blue-500/30',
      unlocked: false,
      requirements: '100 XP • Photo ID',
      rewards: [
        { icon: '💳', title: '$5,000 Credit Line', description: 'Verified member limit' },
        { icon: '⚡', title: 'Priority Support', description: '24/7 dedicated help' },
        { icon: '🎁', title: 'Referral Bonuses', description: 'Earn $50 per referral' },
      ]
    },
    {
      tier: 'Elite',
      level: 3,
      gradient: 'from-purple-400 via-purple-500 to-purple-600',
      shadowColor: 'shadow-purple-500/30',
      unlocked: false,
      requirements: '500 XP • 3 Referrals',
      rewards: [
        { icon: '💎', title: '$25,000 Credit Line', description: 'Elite tier access' },
        { icon: '🎪', title: 'Exclusive Events', description: 'VIP networking access' },
        { icon: '✨', title: 'Premium Card Design', description: 'Holographic identity card' },
      ]
    },
    {
      tier: 'Legend',
      level: 4,
      gradient: 'from-amber-400 via-amber-500 to-amber-600',
      shadowColor: 'shadow-amber-500/30',
      unlocked: false,
      requirements: '2,000 XP • 10 Referrals',
      rewards: [
        { icon: '👑', title: 'Unlimited Credit', description: 'No preset spending limit' },
        { icon: '🛎️', title: 'Concierge Service', description: 'Personal vault assistant' },
        { icon: '💠', title: 'Diamond Card', description: 'Physical diamond-tier card' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Tier Unlock Rewards
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Progress through tiers to unlock exclusive benefits, higher credit limits, and premium experiences
          </p>
        </div>

        {/* Progression Timeline */}
        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-gray-500 via-blue-500 via-purple-500 to-amber-500 -translate-y-1/2 hidden md:block" />
          
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
            {tierRewards.map((tier, index) => (
              <div key={tier.tier} className="relative">
                {/* Timeline Dot */}
                <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-background hidden md:flex items-center justify-center ${
                  tier.unlocked 
                    ? `bg-gradient-to-r ${tier.gradient} shadow-lg ${tier.shadowColor}` 
                    : 'bg-muted'
                }`}>
                  {tier.unlocked && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  )}
                </div>

                {/* Tier Card */}
                <div className={`relative mt-8 p-6 rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 hover:scale-[1.02] ${
                  tier.unlocked
                    ? `bg-gradient-to-br ${tier.gradient} border-transparent shadow-2xl ${tier.shadowColor}`
                    : 'bg-card/50 border-border/50 hover:border-primary/30'
                }`}>
                  {/* Lock Icon for Locked Tiers */}
                  {!tier.unlocked && (
                    <div className="absolute -top-4 -right-4 w-10 h-10 bg-muted border-2 border-border rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 8H17V6C17 3.24 14.76 1 12 1S7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8M12 17C10.9 17 10 16.1 10 15S10.9 13 12 13 14 13.9 14 15 13.1 17 12 17M15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9S15.1 4.29 15.1 6V8Z" />
                      </svg>
                    </div>
                  )}

                  {/* Tier Header */}
                  <div className="text-center mb-6 space-y-2">
                    <div className={`text-6xl font-black ${tier.unlocked ? 'text-white' : 'text-foreground/30'}`}>
                      {tier.level}
                    </div>
                    <h2 className={`text-2xl font-black ${tier.unlocked ? 'text-white' : 'text-foreground'}`}>
                      {tier.tier}
                    </h2>
                    {tier.requirements && (
                      <p className={`text-xs font-medium ${tier.unlocked ? 'text-white/80' : 'text-muted-foreground'}`}>
                        {tier.requirements}
                      </p>
                    )}
                  </div>

                  {/* Rewards List */}
                  <div className="space-y-4">
                    {tier.rewards.map((reward, rIndex) => (
                      <div 
                        key={rIndex}
                        className={`p-4 rounded-xl ${
                          tier.unlocked 
                            ? 'bg-white/10 backdrop-blur-sm' 
                            : 'bg-background/50 border border-border/50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-2xl flex-shrink-0">{reward.icon}</span>
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-sm font-bold ${tier.unlocked ? 'text-white' : 'text-foreground'}`}>
                              {reward.title}
                            </h3>
                            <p className={`text-xs ${tier.unlocked ? 'text-white/70' : 'text-muted-foreground'}`}>
                              {reward.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Status Badge */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    {tier.unlocked ? (
                      <div className="px-4 py-2 bg-white/20 rounded-lg text-center">
                        <span className="text-sm font-bold text-white">✓ Active</span>
                      </div>
                    ) : (
                      <div className="px-4 py-2 bg-muted/50 rounded-lg text-center">
                        <span className="text-sm font-bold text-muted-foreground">Locked</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-16">
          <h2 className="text-3xl font-black text-center text-foreground mb-8">
            Complete Benefits Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-card/50 border border-border rounded-2xl overflow-hidden backdrop-blur-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-4 text-left text-sm font-bold text-foreground">Feature</th>
                  {tierRewards.map(tier => (
                    <th key={tier.tier} className="p-4 text-center text-sm font-bold text-foreground">
                      {tier.tier}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr>
                  <td className="p-4 text-sm text-muted-foreground font-medium">Credit Limit</td>
                  <td className="p-4 text-center text-sm text-foreground">$1,000</td>
                  <td className="p-4 text-center text-sm text-foreground">$5,000</td>
                  <td className="p-4 text-center text-sm text-foreground">$25,000</td>
                  <td className="p-4 text-center text-sm text-primary font-bold">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 text-sm text-muted-foreground font-medium">Referral Earnings</td>
                  <td className="p-4 text-center text-sm text-foreground">—</td>
                  <td className="p-4 text-center text-sm text-foreground">$50</td>
                  <td className="p-4 text-center text-sm text-foreground">$100</td>
                  <td className="p-4 text-center text-sm text-foreground">$250</td>
                </tr>
                <tr>
                  <td className="p-4 text-sm text-muted-foreground font-medium">Support Level</td>
                  <td className="p-4 text-center text-sm text-foreground">Standard</td>
                  <td className="p-4 text-center text-sm text-foreground">Priority</td>
                  <td className="p-4 text-center text-sm text-foreground">VIP</td>
                  <td className="p-4 text-center text-sm text-foreground">Concierge</td>
                </tr>
                <tr>
                  <td className="p-4 text-sm text-muted-foreground font-medium">Physical Card</td>
                  <td className="p-4 text-center">
                    <svg className="w-5 h-5 text-muted-foreground mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                    </svg>
                  </td>
                  <td className="p-4 text-center">
                    <svg className="w-5 h-5 text-primary mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </td>
                  <td className="p-4 text-center">
                    <svg className="w-5 h-5 text-primary mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </td>
                  <td className="p-4 text-center">
                    <svg className="w-5 h-5 text-primary mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="text-center p-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-2xl">
          <h3 className="text-3xl font-black text-foreground mb-4">Start Your Journey Today</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Every member starts at Initiate tier. Complete challenges, earn XP, and unlock premium rewards as you progress.
          </p>
          <button className="px-10 py-5 bg-gradient-to-r from-primary to-accent text-primary-foreground text-lg font-bold rounded-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all">
            Create Your Account
          </button>
        </div>
      </div>
    </div>
  );
}
