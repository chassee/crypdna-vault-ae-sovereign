
import React from 'react';
import { Button } from '@/components/ui/button';
import PawCard from './PawCard';
import { Sparkles, Shield, Star } from 'lucide-react';

const VaultViewer = () => {
  const userName = 'Parris Johnson';
  const crypDnaId = '#DAWG237';
  const vaultTier = 'Viewer';
  const unlockUrl = 'https://example.com/unlock-tier-2'; // Replace with actual URL

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome to the Vault
            </h1>
            <Sparkles className="w-8 h-8 text-pink-600" />
          </div>
          <p className="text-xl font-semibold text-gray-800 mb-2">{userName}</p>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-purple-200 shadow-lg">
            <p className="text-lg font-bold text-purple-700 mb-1">CrypDNA ID</p>
            <p className="text-2xl font-mono font-bold text-gray-800">{crypDnaId}</p>
          </div>
        </div>

        {/* Vault Tier Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Shield className="w-6 h-6" />
            <h2 className="text-xl font-bold">Vault Tier</h2>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold mb-2">{vaultTier}</p>
            <div className="flex justify-center gap-1 mb-2">
              <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              <Star className="w-5 h-5 text-white/50" />
              <Star className="w-5 h-5 text-white/50" />
            </div>
            <p className="text-sm opacity-90">Basic access to CrypDNA Vault</p>
          </div>
        </div>

        {/* Card Preview Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-pink-200 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Your Crypdawgs Card</h3>
          <div className="flex justify-center mb-4">
            <div className="transform scale-75">
              <PawCard
                memberName={userName}
                cardNumber="4242 2044 0000 9912"
                expDate="12/28"
                vaultTag={`VAULT ${vaultTier.toUpperCase()} ${crypDnaId}`}
              />
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center italic">Tap card to view details</p>
        </div>

        {/* Unlock Button */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-6 shadow-lg">
          <div className="text-center text-white mb-4">
            <h3 className="text-xl font-bold mb-2">Ready to Level Up?</h3>
            <p className="text-sm opacity-90">Unlock Tier 2 for premium benefits and exclusive features</p>
          </div>
          <Button 
            className="w-full bg-white text-gray-800 hover:bg-gray-100 font-bold py-3 px-6 rounded-xl text-lg shadow-md transition-all duration-300 hover:shadow-lg"
            onClick={() => window.open(unlockUrl, '_blank')}
          >
            🚀 Unlock Tier 2
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">CrypDNA Vault • Secure • Exclusive</p>
        </div>
      </div>
    </div>
  );
};

export default VaultViewer;
