import React from 'react';
import { Instagram, Eye, Lock } from 'lucide-react';

const VaultDrops: React.FC = () => {
  // Drop 1 - Vinyl Exclusives
  const vinylCollection = [
    {
      id: 'v1',
      title: 'Tripjaw Vinyl',
      description: 'Vault Unlock',
      category: 'Collector Archive',
      rarity: 'Legendary',
      image: '/lovable-uploads/5e535260-24a3-4ed3-9d4a-796ece23cc29.png'
    },
    {
      id: 'v2',
      title: 'Red Shift Vinyl',
      description: 'Vault Unlock',
      category: 'Collector Archive',
      rarity: 'Legendary',
      image: '/lovable-uploads/d420655e-40c1-43e6-a515-1cd2b2ea2702.png'
    },
    {
      id: 'v3',
      title: 'Lazerbite Vinyl',
      description: 'Vault Unlock',
      category: 'Collector Archive',
      rarity: 'Epic',
      image: '/lovable-uploads/981b6c81-e87e-40b1-8e79-272d5a2465f1.png'
    },
    {
      id: 'v4',
      title: 'Chromaburst Vinyl',
      description: 'Vault Unlock',
      category: 'Collector Archive',
      rarity: 'Epic',
      image: '/lovable-uploads/e6edc075-737b-4dad-b53f-9787c56ce4d1.png'
    },
    {
      id: 'v5',
      title: 'Cryopulse Vinyl',
      description: 'Vault Unlock',
      category: 'Collector Archive',
      rarity: 'Legendary',
      image: '/lovable-uploads/09e5172e-7320-4224-baeb-3dde8a2865c5.png'
    },
    {
      id: 'v6',
      title: 'Acid Sight Vinyl',
      description: 'Vault Unlock',
      category: 'Collector Archive',
      rarity: 'Epic'
    }
  ];

  // Drop 1 - Luxury Duffles
  const duffleBags = [
    {
      id: 'd1',
      title: 'Venom Pup Duffle',
      description: 'Premium Exclusive',
      category: 'Ultra-Limited',
      rarity: 'Mythic',
      image: '/lovable-uploads/9d010ec4-6e42-4286-b5cf-df7869e0d131.png'
    },
    {
      id: 'd2',
      title: 'Sky Alpha Duffle',
      description: 'Premium Exclusive',
      category: 'Ultra-Limited', 
      rarity: 'Mythic',
      image: '/lovable-uploads/fc7fcc75-198f-462d-8532-63fa3d6cf8cd.png'
    },
    {
      id: 'd3',
      title: 'Solar Fang Duffle',
      description: 'Premium Exclusive',
      category: 'Ultra-Limited',
      rarity: 'Mythic',
      image: '/lovable-uploads/0831920d-6e80-407b-bb92-30baf74dd023.png'
    },
    {
      id: 'd4',
      title: 'Frost Pup Duffle',
      description: 'Premium Exclusive',
      category: 'Ultra-Limited',
      rarity: 'Mythic',
      image: '/lovable-uploads/61f72b3d-7679-473e-974f-26d69e18674d.png'
    }
  ];

  // Drop 1 - Signature Truckers
  const truckerHats = [
    {
      id: 't1',
      title: 'Blush Alpha Trucker',
      description: 'Limited Edition',
      category: 'Signature Series',
      rarity: 'Legendary',
      image: '/lovable-uploads/de993d36-86e4-4baa-8355-ead37c9a0235.png'
    },
    {
      id: 't2',
      title: 'Sky Alpha Trucker',
      description: 'Limited Edition',
      category: 'Signature Series',
      rarity: 'Legendary',
      image: '/lovable-uploads/7d33ec1a-d32a-423c-8a69-4cb4310b7400.png'
    },
    {
      id: 't3',
      title: 'Venom Pup Trucker',
      description: 'Limited Edition',
      category: 'Signature Series',
      rarity: 'Legendary',
      image: '/lovable-uploads/845cb564-fcb1-4f4b-9b9a-1c5318cc7a23.png'
    },
    {
      id: 't4',
      title: 'Frost Pup Trucker',
      description: 'Limited Edition',
      category: 'Signature Series',
      rarity: 'Legendary',
      image: '/lovable-uploads/102b3105-137a-48fa-8e7e-4652156a771e.png'
    },
    {
      id: 't5',
      title: 'Solar Fang Trucker',
      description: 'Limited Edition',
      category: 'Signature Series',
      rarity: 'Legendary',
      image: '/lovable-uploads/5419e25b-c0f5-49fd-9d90-d6ed944c0777.png'
    },
    {
      id: 't6',
      title: 'Gold Fang Trucker',
      description: 'Limited Edition',
      category: 'Signature Series',
      rarity: 'Legendary',
      image: '/lovable-uploads/b300b4c6-77ab-474d-8bac-a5394dfa49aa.png'
    }
  ];

  // Mystery drops
  const mysteryDrops = [
    {
      id: 'm1',
      title: 'Mystery Drop Omega',
      description: 'Unknown rarity, unknown power',
      category: 'Mystery',
      rarity: 'Unknown'
    },
    {
      id: 'm2',
      title: 'Vault Key Fragment',
      description: 'Piece of something greater',
      category: 'Mystery',
      rarity: 'Unknown'
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
      case 'rare':
        return 'from-green-500 to-emerald-500';
      case 'unknown':
        return 'from-gray-800 to-black';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const renderDropCard = (drop: any, isProduct = false, isMystery = false) => {
    const rarityGradient = getRarityColor(drop.rarity);
    
    return (
      <div
        key={drop.id}
        className="luxury-card group hover:scale-[1.05] luxury-transition hover:shadow-glow relative overflow-hidden hover-card transform-gpu"
      >
        {/* Product image or placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-purple-900/20 to-pink-900/20 overflow-hidden">
          {drop.image && !isMystery ? (
            <>
              {/* Actual product image */}
              <img 
                src={drop.image} 
                alt={drop.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Luxury lock overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center backdrop-blur-sm">
                <div className="text-center space-y-3">
                  <div className="relative">
                    <Lock className="w-10 h-10 text-luxury-purple mx-auto animate-pulse drop-shadow-glow" />
                    <div className="absolute inset-0 w-10 h-10 mx-auto border border-luxury-purple/50 rounded-lg animate-ping" />
                  </div>
                  <div className="text-sm text-luxury-purple font-medium tracking-wider drop-shadow-lg">
                    COMING SOON
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Blurred mystery placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-black/50 to-gray-900/50 rounded-lg blur-xl" />
              </div>
              
              {/* Mystery lock overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center backdrop-blur-md">
                <div className="text-center space-y-3">
                  <div className="relative">
                    <Lock className="w-10 h-10 text-purple-400 mx-auto animate-pulse" />
                    <div className="absolute inset-0 w-10 h-10 mx-auto border border-purple-400/50 rounded-lg animate-ping" />
                  </div>
                  <div className="text-sm text-purple-300 font-medium tracking-wider">
                    MYSTERY COMING SOON
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Rarity indicator */}
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${rarityGradient} shadow-lg`}>
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
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Vinyl Exclusives */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground border-b-2 border-luxury-gold inline-block pb-1">
            Vinyl Exclusives
          </h3>
          <p className="text-muted-foreground">Collector archive vinyl series</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {vinylCollection.map((vinyl) => renderDropCard(vinyl, true, false))}
        </div>
      </div>

      {/* Luxury Duffles */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground border-b-2 border-luxury-purple inline-block pb-1">
            Luxury Duffles
          </h3>
          <p className="text-muted-foreground">Ultra-limited duffle bag collection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {duffleBags.map((drop) => renderDropCard(drop, false, false))}
        </div>
      </div>

      {/* Signature Truckers */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground border-b-2 border-cyan-500 inline-block pb-1">
            Signature Truckers
          </h3>
          <p className="text-muted-foreground">Limited edition trucker hat collection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {truckerHats.map((hat) => renderDropCard(hat, true, false))}
        </div>
      </div>

      {/* Mystery Drops Section */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-foreground border-b-2 border-gray-500 inline-block pb-1">
            Mystery Drops
          </h3>
          <p className="text-muted-foreground">Unknown rarities, unlimited potential</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mysteryDrops.map((mystery) => renderDropCard(mystery, false, true))}
        </div>
      </div>

      {/* Exclusive Access Card */}
      <div className="luxury-card bg-gradient-to-r from-luxury-purple/10 to-luxury-gold/10 border-luxury-purple/20 hover-card">
        <div className="p-6 text-center space-y-4">
          <div className="text-4xl animate-pulse">🎁</div>
          <h4 className="text-xl font-semibold text-foreground">Exclusive Access</h4>
          <p className="text-muted-foreground max-w-md mx-auto">
            All drops, products, and mysteries are only available to verified vault members. Follow @crypdawgs for hints and reveals.
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