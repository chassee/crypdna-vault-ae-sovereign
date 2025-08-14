
import React from 'react';
import PawCard from './PawCard';
import VaultTierBadge from './VaultTierBadge';

// Placeholder logic: use this for now (replace with real user from context/auth later)
const MEMBER_NAME = 'Parris Johnson';
const CARD_NUMBER = '4242 2044 0000 9912';
const EXP_DATE = '12/28';

const MemberCard = () => {
  const cardBalance = 12847.50;
  const memberSince = "2024";
  const memberTier = "Legend";
  const hasBalance = cardBalance > 0;

  return (
    <div className="wallet-card p-8 mb-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-100">Crypdawgs Card Balance</h2>
            <VaultTierBadge tier={memberTier as any} />
          </div>
          <p className="text-gray-400">Billionaire Member since {memberSince}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent dna-score-pulse dna-score-glow">
            ${cardBalance.toLocaleString()}
          </p>
          <p className="text-sm text-green-400 font-medium">+2.3% this month</p>
        </div>
      </div>
      
      {/* Enhanced Card with Apple Wallet style */}
      <div className="flex justify-center mb-6">
        <div className={`relative ${hasBalance ? 'dna-score-pulse' : ''}`}>
          {hasBalance && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-3xl blur-xl"></div>
          )}
          <div className="relative wallet-card p-2 rounded-3xl">
            <PawCard
              memberName={MEMBER_NAME}
              cardNumber={CARD_NUMBER}
              expDate={EXP_DATE}
            />
          </div>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <p className="text-xs text-gray-500 italic">Tap card for Apple Wallet-style interaction</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="apple-card text-center p-4">
          <p className="text-sm text-gray-400">Monthly Limit</p>
          <p className="text-lg font-bold text-purple-400">$50,000</p>
        </div>
        <div className="apple-card text-center p-4">
          <p className="text-sm text-gray-400">Cash Back</p>
          <p className="text-lg font-bold text-blue-400">3.5%</p>
        </div>
        <div className="apple-card text-center p-4">
          <p className="text-sm text-gray-400">Status</p>
          <p className="text-lg font-bold text-status-active">Active</p>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
