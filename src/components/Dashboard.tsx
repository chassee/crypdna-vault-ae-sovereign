
import React from 'react';
import { User, FileText, Vault } from 'lucide-react';
import Navigation from './Navigation';
import MemberCard from './MemberCard';
import CrypDNACard from './CrypDNACard';
import VaultFiles from './VaultFiles';

const Dashboard = () => {
  // Generate unique CrypDNA file number
  const crypDNANumber = `CRYP-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Date.now().toString().slice(-6)}`;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />
      
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Welcome to the Vault, Legend
          </h1>
          <p className="text-gray-600 text-lg">Your premium CrypDNA financial gateway awaits</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Member Card Balance */}
          <div className="lg:col-span-2">
            <MemberCard />
          </div>
          
          {/* CrypDNA File */}
          <div>
            <CrypDNACard fileNumber={crypDNANumber} />
          </div>
        </div>

        {/* Vault Files Section */}
        <VaultFiles />
        
        {/* Future Expansion Placeholder */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold">AI</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">AI Bot Integration</h3>
            <p className="text-gray-600 text-sm">Coming Soon: Personalized financial AI assistant</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold">NT</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Neurotech Unlocks</h3>
            <p className="text-gray-600 text-sm">Coming Soon: Advanced cognitive financial insights</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold">EM</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Emotion Vault Tiers</h3>
            <p className="text-gray-600 text-sm">Coming Soon: Sentiment-based premium access</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
