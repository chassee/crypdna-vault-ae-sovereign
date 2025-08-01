import React from 'react';
import { Instagram, Eye, Lock } from 'lucide-react';

const VaultDrops: React.FC = () => {
  const exclusiveDrops = [
    {
      id: '1',
      title: 'Drop Alpha',
      description: 'Premium Exclusive',
      category: 'Ultra-Limited',
      rarity: 'Mythic'
    },
    {
      id: '2', 
      title: 'Drop Beta',
      description: 'Vault Member Unlock',
      category: 'Member Access',
      rarity: 'Legendary'
    },
    {
      id: '3',
      title: 'Genesis',
      description: 'First Edition Archive',
      category: 'Founder Series',
      rarity: 'Epic'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'mythic':
        return 'from-purple-500 to-pink-500';
      case 'legendary':
        return 'from-yellow-500 to-orange-500';
      case 'epic':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-foreground border-b-2 border-luxury-purple inline-block pb-1">
          Exclusive Drops
        </h3>
        <p className="text-muted-foreground">Ultra-rare collectibles for vault members</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exclusiveDrops.map((drop) => {
          const rarityGradient = getRarityColor(drop.rarity);
          
          return (
            <div
              key={drop.id}
              className="luxury-card group hover:scale-[1.02] luxury-transition hover:shadow-glow relative overflow-hidden hover-card"
            >
              {/* Blurred silhouette placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-purple-900/20 to-pink-900/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-lg blur-xl" />
                </div>
                
                {/* Luxury lock overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center backdrop-blur-md">
                  <div className="text-center space-y-3">
                    <div className="relative">
                      <Lock className="w-10 h-10 text-purple-400 mx-auto animate-pulse" />
                      <div className="absolute inset-0 w-10 h-10 mx-auto border border-purple-400/50 rounded-lg animate-ping" />
                    </div>
                    <div className="text-sm text-purple-300 font-medium tracking-wider">EXCLUSIVE DROP COMING SOON</div>
                  </div>
                </div>

                {/* Rarity indicator */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${rarityGradient}`}>
                  {drop.rarity}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-foreground">{drop.title}</h4>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{drop.description}</p>
                  <div className="text-xs text-muted-foreground">Category: {drop.category}</div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Instagram className="w-4 h-4" />
                    <span>Revealed on Instagram</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-luxury-purple">
                    <Eye className="w-3 h-3" />
                    <span>Preview</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="luxury-card bg-gradient-to-r from-luxury-purple/10 to-luxury-gold/10 border-luxury-purple/20 hover-card">
        <div className="p-6 text-center space-y-4">
          <div className="text-4xl animate-pulse">🎁</div>
          <h4 className="text-xl font-semibold text-foreground">Exclusive Access</h4>
          <p className="text-muted-foreground max-w-md mx-auto">
            These collectibles are only available to verified vault members. Follow @crypdawgs for hints.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-luxury-purple">
            <Instagram className="w-4 h-4" />
            <span>Follow @crypdawgs for hints</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultDrops;