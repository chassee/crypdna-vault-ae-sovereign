
import React from 'react';

interface VaultTierBadgeProps {
  tier: 'Viewer' | 'Verified Pawprint' | 'Ascended' | 'Legend';
}

const VaultTierBadge = ({ tier }: VaultTierBadgeProps) => {
  const getBadgeStyle = (tier: string) => {
    switch (tier) {
      case 'Viewer':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'Verified Pawprint':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Ascended':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Legend':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getBadgeStyle(tier)}`}>
      🎖 {tier}
    </span>
  );
};

export default VaultTierBadge;
