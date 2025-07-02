
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
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-800">Crypdawgs Card Balance</h2>
            <VaultTierBadge tier={memberTier as any} />
          </div>
          <p className="text-gray-600">Member since {memberSince}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            ${cardBalance.toLocaleString()}
          </p>
          <p className="text-sm text-green-600 font-medium">+2.3% this month</p>
        </div>
      </div>
      
      {/* Card with conditional glow animation */}
      <div className="flex justify-center mb-4">
        <div className={`relative ${hasBalance ? 'animate-pulse' : ''}`}>
          {hasBalance && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-3xl blur-lg animate-pulse"></div>
          )}
          <PawCard
            memberName={MEMBER_NAME}
            cardNumber={CARD_NUMBER}
            expDate={EXP_DATE}
          />
        </div>
      </div>
      
      <div className="text-center mb-6">
        <p className="text-xs text-gray-500 italic">Tap card to view details</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl">
          <p className="text-sm text-gray-600">Monthly Limit</p>
          <p className="text-lg font-bold text-purple-600">$50,000</p>
        </div>
        <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl">
          <p className="text-sm text-gray-600">Cash Back</p>
          <p className="text-lg font-bold text-blue-600">3.5%</p>
        </div>
        <div className="text-center p-4 bg-gradient-to-r from-cyan-100 to-green-100 rounded-xl">
          <p className="text-sm text-gray-600">Status</p>
          <p className="text-lg font-bold text-green-600">Active</p>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
