
import React from 'react';
import PawCard from './PawCard';

const MemberCard = () => {
  const cardBalance = 12847.50;
  const memberSince = "2024";
  const memberTier = "Legend";

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Crypdawgs Card Balance</h2>
          <p className="text-gray-600">Member since {memberSince} • {memberTier} Tier</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            ${cardBalance.toLocaleString()}
          </p>
          <p className="text-sm text-green-600 font-medium">+2.3% this month</p>
        </div>
      </div>
      
      <div className="flex justify-center">
        <PawCard balance={cardBalance} memberTier={memberTier} />
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl">
          <p className="text-sm text-gray-600">Available Credit</p>
          <p className="text-lg font-bold text-purple-600">$25,000</p>
        </div>
        <div className="text-center p-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl">
          <p className="text-sm text-gray-600">Rewards Points</p>
          <p className="text-lg font-bold text-blue-600">847</p>
        </div>
        <div className="text-center p-4 bg-gradient-to-r from-cyan-100 to-green-100 rounded-xl">
          <p className="text-sm text-gray-600">Next Tier</p>
          <p className="text-lg font-bold text-green-600">Elite</p>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
