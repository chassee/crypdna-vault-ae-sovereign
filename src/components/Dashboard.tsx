
import React from 'react';
import { User, FileText, Vault, Shield, Star } from 'lucide-react';
import Navigation from './Navigation';
import MemberCard from './MemberCard';
import CrypDNACard from './CrypDNACard';
import VaultFiles from './VaultFiles';
import DuffleBagsPreview from './DuffleBagsPreview';
import TruckerHatsPreview from './TruckerHatsPreview';
import VinylCollectiblesPreview from './VinylCollectiblesPreview';
import VaultVerification from './VaultVerification';
import BalanceBreakdown from './BalanceBreakdown';
import CrypbotCompanion from './CrypbotCompanion';

const Dashboard = () => {
  // Generate unique CrypDNA file number
  const crypDNANumber = `CRYP-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Date.now().toString().slice(-6)}`;
  const vaultId = Math.floor(Math.random() * 999) + 1;
  
  return (
    <div className="min-h-screen bg-background page-transition">
      <Navigation />
      
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section with Vault ID */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 sparkle-animation">
                Welcome to the Vault, Legend
              </h1>
              <p className="text-muted-foreground text-lg">Your billionaire-class CrypDNA financial gateway awaits</p>
            </div>
            <div className="text-right">
              <div className="apple-card px-6 py-3 text-white shadow-xl">
                <p className="text-sm font-medium text-white/80">Assigned Vault ID</p>
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
            <BalanceBreakdown />
          </div>
          
          {/* Right Column - CrypDNA File and new components */}
          <div className="space-y-6">
            <CrypDNACard fileNumber={crypDNANumber} />
            <CrypbotCompanion />
          </div>
        </div>

        {/* Vault Verification Section */}
        <div className="mb-8">
          <VaultVerification />
        </div>

        {/* Apple Wallet Style Credit Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="wallet-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Credit</p>
                <p className="text-2xl font-bold text-green-600 dna-score-pulse">$47,500</p>
              </div>
            </div>
            <div className="apple-card p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
              <p className="text-xs text-muted-foreground">Credit Utilization: 15%</p>
            </div>
          </div>

          <div className="wallet-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rewards Points</p>
                <p className="text-2xl font-bold text-blue-600 dna-score-pulse">2,847</p>
              </div>
            </div>
            <div className="apple-card p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
              <p className="text-xs text-muted-foreground">+247 pts this month</p>
            </div>
          </div>

          <div className="wallet-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Vault className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Next Tier</p>
                <p className="text-2xl font-bold text-purple-600 dna-score-pulse">Elite</p>
              </div>
            </div>
            <div className="apple-card p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <p className="text-xs text-muted-foreground">Progress: 78%</p>
            </div>
          </div>

          <div className="wallet-card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">+</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Score Boost</p>
                <p className="text-2xl font-bold text-orange-600 dna-score-pulse">+127</p>
              </div>
            </div>
            <div className="apple-card p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10">
              <p className="text-xs text-muted-foreground">Tradeline Benefits</p>
            </div>
          </div>
        </div>

        {/* Note: Old VaultFiles component removed - replaced with VaultVerification in VaultDashboard */}

        {/* Drop 1 Preview – Duffle Bags */}
        <DuffleBagsPreview />

        {/* Drop 1 Preview – Trucker Hats */}
        <TruckerHatsPreview />

        {/* Drop 1 Preview – Vinyl Collectibles */}
        <VinylCollectiblesPreview />
        
        {/* Billionaire Member Perks Section */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Exclusive Billionaire Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="wallet-card p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Priority Support</h3>
              <p className="text-muted-foreground text-sm mb-4">24/7 dedicated concierge for Legend tier members</p>
              <div className="apple-card p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                <p className="text-sm text-status-active font-bold">✓ Active</p>
              </div>
            </div>
            
            <div className="wallet-card p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Exclusive Rewards</h3>
              <p className="text-muted-foreground text-sm mb-4">Access to billionaire-tier multipliers and exclusive benefits</p>
              <div className="apple-card p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <p className="text-sm text-status-active font-bold">10x Points Active</p>
              </div>
            </div>
            
            <div className="wallet-card p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <Vault className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Vault Tier Upgrades</h3>
              <p className="text-muted-foreground text-sm mb-4">Automatic progression with enhanced billionaire benefits</p>
              <div className="apple-card p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
                <p className="text-xs text-blue-600 font-medium">Next: Elite (78%)</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Future Luxury Expansion */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="wallet-card p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold">AI</span>
            </div>
            <h3 className="font-bold text-foreground mb-2">AI Concierge</h3>
            <p className="text-muted-foreground text-sm">Coming Soon: Personal AI financial advisor with billionaire-level insights</p>
          </div>
          
          <div className="wallet-card p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold">NT</span>
            </div>
            <h3 className="font-bold text-foreground mb-2">Neurotech Access</h3>
            <p className="text-muted-foreground text-sm">Coming Soon: Cognitive-enhanced credit optimization and neural wealth insights</p>
          </div>
          
          <div className="wallet-card p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
              <span className="text-white font-bold">EM</span>
            </div>
            <h3 className="font-bold text-foreground mb-2">Emotion Vault</h3>
            <p className="text-muted-foreground text-sm">Coming Soon: Sentiment-driven luxury access and emotional wealth management</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
