import React from 'react';
import { User, FileText, Vault, Shield, Star } from 'lucide-react';
import Navigation from './Navigation';
import MemberCard from './MemberCard';
import CrypDNACard from './CrypDNACard';
import VaultFiles from './VaultFiles';
import DuffleBagsPreview from './DuffleBagsPreview';

const Dashboard = () => {
  // Generate unique CrypDNA file number
  const crypDNANumber = `CRYP-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Date.now().toString().slice(-6)}`;
  const vaultId = Math.floor(Math.random() * 999) + 1;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />
      
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section with Vault ID */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Welcome to the Vault, Legend
              </h1>
              <p className="text-gray-600 text-lg">Your premium CrypDNA financial gateway awaits</p>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                <p className="text-sm font-medium">Assigned Vault ID</p>
                <p className="text-xl font-bold">Vault Legend #{vaultId}</p>
              </div>
            </div>
          </div>
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

        {/* Credit Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Available Credit</p>
                <p className="text-2xl font-bold text-green-600">$47,500</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">Credit Utilization: 15%</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Rewards Points</p>
                <p className="text-2xl font-bold text-blue-600">2,847</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">+247 pts this month</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Vault className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Next Tier</p>
                <p className="text-2xl font-bold text-purple-600">Elite</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">Progress: 78%</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">+</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Score Boost</p>
                <p className="text-2xl font-bold text-orange-600">+127</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">Tradeline Benefits</p>
            </div>
          </div>
        </div>

        {/* Vault Files Section */}
        <VaultFiles />

        {/* Drop 1 Preview – Duffle Bags */}
        <DuffleBagsPreview />
        
        {/* Member Perks Section */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Exclusive Member Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Priority Support</h3>
              <p className="text-gray-600 text-sm mb-4">24/7 dedicated support line for Legend tier members</p>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3">
                <p className="text-xs text-green-600 font-medium">✓ Active</p>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Exclusive Rewards</h3>
              <p className="text-gray-600 text-sm mb-4">Access to premium reward multipliers and exclusive offers</p>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3">
                <p className="text-xs text-purple-600 font-medium">5x Points Active</p>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Vault className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Vault Tier Upgrades</h3>
              <p className="text-gray-600 text-sm mb-4">Automatic tier progression with enhanced benefits</p>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3">
                <p className="text-xs text-blue-600 font-medium">Next: Elite (78%)</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Future Expansion Placeholder */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold">AI</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">AI Bot Integration</h3>
            <p className="text-gray-600 text-sm">Coming Soon: Personalized financial AI assistant for advanced credit optimization</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold">NT</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Neurotech Unlocks</h3>
            <p className="text-gray-600 text-sm">Coming Soon: Cognitive-based credit tools and neural financial insights</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold">EM</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Emotion Vault Tiers</h3>
            <p className="text-gray-600 text-sm">Coming Soon: Sentiment-based premium access and emotion-driven benefits</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
