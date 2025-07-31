import React from 'react';
import { Instagram, Eye, Lock } from 'lucide-react';

const VaultDrops: React.FC = () => {
  const exclusiveDrops = [
    {
      id: '1',
      title: 'Mystery Drop #1',
      description: 'Ultra-rare collectible series',
      category: 'Limited Edition',
      rarity: 'Legendary'
    },
    {
      id: '2', 
      title: 'Vault Member Exclusive',
      description: 'Premium members only access',
      category: 'Members Only',
      rarity: 'Epic'
    },
    {
      id: '3',
      title: 'Genesis Collection',
      description: 'First edition vault items',
      category: 'Genesis',
      rarity: 'Mythic'
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
        <h3 className="text-2xl font-bold text-dark-grey border-b-2 border-luxury-purple inline-block pb-1">
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
              {/* Clean gradient placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-200/50 to-pink-200/50 rounded-full blur-lg" />
                  <div className="absolute w-16 h-20 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-lg blur-md" />
                </div>
                
                {/* Overlay with lock icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/40 to-transparent flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center space-y-2">
                    <Lock className="w-8 h-8 text-purple-600 mx-auto" />
                    <div className="text-xs text-purple-700 font-medium">Coming Soon</div>
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
                    <h4 className="text-lg font-semibold text-dark-grey">{drop.title}</h4>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500 text-white glow-purple">
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
          <h4 className="text-xl font-semibold text-dark-grey">Exclusive Access</h4>
          <p className="text-muted-foreground max-w-md mx-auto">
            These collectibles are only available to verified vault members. Follow @crypdawgs on Instagram for reveals.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-luxury-purple">
            <Instagram className="w-4 h-4" />
            <span>Follow @crypdawgs for reveals</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultDrops;