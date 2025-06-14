
import React from 'react';
import { Lock } from 'lucide-react';

const hats = [
  {
    id: 1,
    name: 'Sky Alpha',
    image: '/lovable-uploads/a85da9b8-8c56-4a82-8abd-852e7ea211cd.png',
  },
  {
    id: 2,
    name: 'Solar Fang',
    image: '/lovable-uploads/276b587c-6c97-4683-9d77-bcf3449cdf93.png',
  },
  {
    id: 3,
    name: 'Venom Pup',
    image: '/lovable-uploads/99f37403-c9a5-453b-b011-3653418cafd3.png',
  },
  {
    id: 4,
    name: 'Gold Fang',
    image: '/lovable-uploads/3938a2f6-dc86-4218-b134-65a8cec1a18a.png',
  },
  {
    id: 5,
    name: 'Blush Alpha',
    image: '/lovable-uploads/e849c11d-dcca-492f-ada3-74fa561d2f6e.png',
  },
  {
    id: 6,
    name: 'Frost Pup',
    image: '/lovable-uploads/525c0e08-7172-4fc8-8a22-11cf948ca81f.png',
  },
];

const TruckerHatsPreview = () => {
  // NOTE: Section should only be visible to logged-in approved members (for now always shown)
  return (
    <div className="mt-14 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 tracking-tight">
          Drop 1 Preview – Trucker Hats
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full mx-auto mt-3"></div>
      </div>

      <div className="w-full bg-white/90 backdrop-blur rounded-3xl px-6 py-10 border border-purple-100 shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-7">
          {hats.map((hat) => (
            <div
              key={hat.id}
              className="group relative flex flex-col items-center bg-white rounded-2xl px-4 pt-5 pb-7 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-purple-200 transition-all duration-300"
            >
              <div className="absolute -z-10 inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-400 pointer-events-none"
                   style={{background: `radial-gradient(circle at 50% 60%, #8d5fff63 10%, #fff0 80%)`}} />
              <div className="flex flex-col items-center w-full">
                <div className="aspect-square w-full max-w-[110px] mb-2 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={hat.image}
                    alt={hat.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="pt-2 pb-4 w-full flex flex-col items-center">
                  <span className="text-base font-bold text-gray-900 tracking-tight group-hover:text-purple-700 transition-all">
                    {hat.name}
                  </span>
                </div>
                <button
                  disabled
                  className="w-full mt-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl py-2.5 flex items-center justify-center gap-2 shadow-lg group-hover:shadow-xl focus:outline-none transition-all duration-200 relative"
                  style={{
                    filter: 'drop-shadow(0 0 7px #b790ff44)',
                  }}
                >
                  <Lock className="w-4 h-4 mr-1 text-white/80 drop-shadow" />
                  <span>🔒 Unlock to Purchase</span>
                  {/* Soft glowing overlay for exclusivity */}
                  <span className="absolute inset-0 rounded-xl pointer-events-none group-hover:opacity-60 opacity-30 transition duration-300"
                        style={{boxShadow: '0 0 24px 5px #a969f91a, 0 2px 12px 1px #afd8ff33'}}></span>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 pt-5 border-t border-gray-100">
          <p className="text-sm text-gray-500 italic">
            Exclusive CrypDNA Vault access required &bull; Limited collectible hats
          </p>
          <div className="flex justify-center items-center mt-2 gap-2">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
            <span className="text-purple-600 text-xs font-semibold">Members Only</span>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckerHatsPreview;
