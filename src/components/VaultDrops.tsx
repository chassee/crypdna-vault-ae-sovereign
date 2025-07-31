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
        <h3 className="text-2xl font-bold bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent">
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
              className="luxury-card group hover:scale-[1.02] luxury-transition hover:shadow-glow relative overflow-hidden"
            >
              {/* Blurred silhouette placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-xl" />
                  <div className="absolute w-16 h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-lg blur-lg" />
                </div>
                
                {/* Overlay with lock icon */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center space-y-2">
                    <Lock className="w-8 h-8 text-white/80 mx-auto" />
                    <div className="text-xs text-white/60">Mystery Item</div>
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
                    <h4 className="text-lg font-semibold">{drop.title}</h4>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-400/20 text-orange-400">
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

      <div className="luxury-card bg-gradient-to-r from-luxury-purple/10 to-luxury-gold/10 border-luxury-purple/20">
        <div className="p-6 text-center space-y-4">
          <div className="text-4xl animate-pulse">🎁</div>
          <h4 className="text-xl font-semibold">Exclusive Access</h4>
          <p className="text-muted-foreground max-w-md mx-auto">
            These rare collectibles are only available to verified vault members. 
            Each drop is limited and reveals exclusive utility.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-luxury-purple">
            <Instagram className="w-4 h-4" />
            <span>Follow @CrypDNA for reveals</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultDrops;