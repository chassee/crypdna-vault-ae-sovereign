
import React from "react";
import { Lock } from "lucide-react";

// Vinyl images in exact upload/name order (1-6)
const vinyls = [
  {
    id: 1,
    name: "Red Shift",
    image: "/lovable-uploads/4934c433-7028-4bb4-9912-bea1d159a949.png",
  },
  {
    id: 2,
    name: "Tripjaw",
    image: "/lovable-uploads/4ba77fd4-c289-4aad-8da5-a8cba148c7be.png",
  },
  {
    id: 3,
    name: "Lazerbite",
    image: "/lovable-uploads/57c2b3de-c2aa-4296-96d2-4232f8c2b4b4.png",
  },
  {
    id: 4,
    name: "Chromaburst",
    image: "/lovable-uploads/10f27071-4ae9-4178-8d98-53d195033824.png",
  },
  {
    id: 5,
    name: "Cryopulse",
    image: "/lovable-uploads/2fa14426-070d-4ae9-a2f9-df553c87f372.png",
  },
  {
    id: 6,
    name: "Acid Sight",
    image: "/lovable-uploads/06253047-1579-4460-ae98-977f95792cc0.png",
  },
];

const VinylCollectiblesPreview = () => {
  // Section is only visible to logged-in, approved Vault members (always visible for now)
  return (
    <div className="mt-14 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 tracking-tight">
          Drop 1 Preview – Vinyl Collectibles
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full mx-auto mt-3"></div>
      </div>
      <div className="w-full bg-white/90 backdrop-blur rounded-3xl px-6 py-10 border border-yellow-100 shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-7">
          {vinyls.map((vinyl) => (
            <div
              key={vinyl.id}
              className="group relative flex flex-col items-center bg-white rounded-2xl px-4 pt-5 pb-7 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-yellow-200 transition-all duration-300"
            >
              <div
                className="absolute -z-10 inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-400 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 60%, #fdbe5077 10%, #fff0 80%)",
                }}
              />
              <div className="flex flex-col items-center w-full">
                <div className="aspect-square w-full max-w-[110px] mb-2 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-yellow-100">
                  <img
                    src={vinyl.image}
                    alt={vinyl.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="pt-2 pb-4 w-full flex flex-col items-center">
                  <span className="text-base font-bold text-gray-900 tracking-tight group-hover:text-yellow-700 transition-all">
                    {vinyl.name}
                  </span>
                </div>
                <button
                  disabled
                  className="w-full mt-auto bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-semibold rounded-xl py-2.5 flex items-center justify-center gap-2 shadow-lg group-hover:shadow-xl focus:outline-none transition-all duration-200 relative"
                  style={{
                    filter: 'drop-shadow(0 0 7px #ffd70044)',
                  }}
                >
                  <Lock className="w-4 h-4 mr-1 text-white/90 drop-shadow" />
                  <span>🔒 Unlock to Purchase</span>
                  {/* Soft glowing overlay for exclusivity */}
                  <span className="absolute inset-0 rounded-xl pointer-events-none group-hover:opacity-60 opacity-30 transition duration-300"
                    style={{boxShadow: '0 0 24px 5px #ffd70022, 0 2px 12px 1px #fdbe5040'}}></span>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 pt-5 border-t border-gray-100">
          <p className="text-sm text-gray-500 italic">
            Exclusive CrypDNA Vault access required &bull; Limited vinyl collectibles
          </p>
          <div className="flex justify-center items-center mt-2 gap-2">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
            <span className="text-yellow-600 text-xs font-semibold">Members Only</span>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VinylCollectiblesPreview;
