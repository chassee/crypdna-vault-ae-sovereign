import React from 'react';
import { Lock } from 'lucide-react';

const VaultProducts: React.FC = () => {
  const products = [
    {
      id: '1',
      title: 'Crypdawgs Duffle',
      description: 'Premium travel companion',
      category: 'Lifestyle'
    },
    {
      id: '2', 
      title: 'Crypdawgs Trucker Hat',
      description: 'Signature headwear collection',
      category: 'Apparel'
    },
    {
      id: '3',
      title: 'Crypdawgs Vinyl',
      description: 'Limited edition soundscape',
      category: 'Collectible'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-foreground border-b-2 border-luxury-purple inline-block pb-1">
          Premium Products
        </h3>
        <p className="text-muted-foreground">Exclusive lifestyle collection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="luxury-card group hover:scale-[1.02] luxury-transition hover:shadow-glow relative overflow-hidden hover-card"
          >
            {/* Blurred product silhouette */}
            <div className="relative h-48 bg-gradient-to-br from-gray-900/20 to-gray-700/20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 bg-gradient-to-br from-gray-500/40 to-gray-600/40 rounded-lg blur-xl" />
              </div>
              
              {/* Luxury lock overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center backdrop-blur-md">
                <div className="text-center space-y-3">
                  <div className="relative">
                    <Lock className="w-10 h-10 text-purple-400 mx-auto animate-pulse" />
                    <div className="absolute inset-0 w-10 h-10 mx-auto border border-purple-400/50 rounded-lg animate-ping" />
                  </div>
                  <div className="text-sm text-purple-300 font-medium tracking-wider">UNLOCK VAULT ACCESS TO REVEAL</div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-foreground">{product.title}</h4>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25">
                    Coming Soon
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{product.description}</p>
                <div className="text-xs text-muted-foreground">Category: {product.category}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="luxury-card bg-gradient-to-r from-luxury-purple/10 to-luxury-gold/10 border-luxury-purple/20 hover-card">
        <div className="p-6 text-center space-y-4">
          <div className="text-4xl animate-pulse">🎁</div>
          <h4 className="text-xl font-semibold text-foreground">Premium Collection</h4>
          <p className="text-muted-foreground max-w-md mx-auto">
            These collectibles are only available to verified vault members. Follow @crypdawgs for hints.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VaultProducts;