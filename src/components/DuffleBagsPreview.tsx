
import React from 'react';
import { Lock } from 'lucide-react';

const DuffleBagsPreview = () => {
  const duffleBags = [
    {
      id: 1,
      name: 'Sky Alpha',
      image: '/lovable-uploads/04b96f31-f2cf-450f-8a31-b1f30cf3fddc.png',
    },
    {
      id: 2,
      name: 'Solar Fang',
      image: '/lovable-uploads/b9ae12a9-b2f6-49cc-92c5-6f3a5c550630.png',
    },
    {
      id: 3,
      name: 'Venom Pup',
      image: '/lovable-uploads/19b15a61-a1c3-4da9-9aee-77f0a3c4f241.png',
    },
    {
      id: 4,
      name: 'Gold Fang',
      image: '/lovable-uploads/3f98ca0b-1107-4d9c-af2f-7037f1770e82.png',
    },
    {
      id: 5,
      name: 'Blush Alpha',
      image: '/lovable-uploads/bdabaf6d-5b1d-4921-87f3-19e49ffd53aa.png',
    },
    {
      id: 6,
      name: 'Frost Pup',
      image: '/lovable-uploads/169e741b-4042-434f-90e0-80cc59762ec6.png',
    },
  ];

  const handleUnlockPurchase = (bagName: string) => {
    console.log(`Unlocking purchase for ${bagName}`);
    // Future: Link to external Shopify product pages
  };

  return (
    <div className="mt-12 mb-8">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Drop 1 Preview – Duffle Bags
        </h2>
        <p className="text-gray-600">Exclusive vault member access • Limited collection</p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mt-4"></div>
      </div>

      {/* Product Grid */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-purple-200 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {duffleBags.map((bag) => (
            <div 
              key={bag.id} 
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200"
            >
              {/* Exclusive Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur"></div>
              
              {/* Product Container */}
              <div className="relative">
                {/* Product Image */}
                <div className="aspect-square mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
                  <img 
                    src={bag.image} 
                    alt={bag.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-bold text-gray-800 text-center mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  {bag.name}
                </h3>

                {/* Unlock Button */}
                <button
                  onClick={() => handleUnlockPurchase(bag.name)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg"
                >
                  <Lock className="w-4 h-4" />
                  <span>Unlock to Purchase</span>
                </button>

                {/* Exclusive Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Lock className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 italic">
            Exclusive CrypDNA Vault access required • Premium collectible series
          </p>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <p className="text-xs text-purple-600 font-medium">Legend Members Only</p>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuffleBagsPreview;
