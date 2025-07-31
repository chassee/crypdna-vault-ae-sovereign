import React, { useEffect, useState } from 'react';

interface LuxuryTierBadgeProps {
  tier: 'Viewer' | 'Verified Pawprint' | 'Ascended' | 'Legend' | 'Elite Ready';
  showUpgradeAnimation?: boolean;
}

const LuxuryTierBadge: React.FC<LuxuryTierBadgeProps> = ({ 
  tier, 
  showUpgradeAnimation = false 
}) => {
  const [isUpgrading, setIsUpgrading] = useState(false);

  useEffect(() => {
    if (showUpgradeAnimation) {
      setIsUpgrading(true);
      // Play upgrade chime
      if (typeof Audio !== 'undefined') {
        try {
          const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBz2QzfLNeSsFJIHK8d2ORg0PVqzh7KtWFQo8lNvxuVkZCjWR1fLZfS4HKHvL8uGLRg0PUqzj6qpYFAo8ldxwuFYYCzTZ1fLZfSwGKH7L8uCLRg0PV6zh7K0');
          audio.volume = 0.2;
          audio.play().catch(() => {});
        } catch (e) {}
      }
      
      const timer = setTimeout(() => setIsUpgrading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showUpgradeAnimation]);

  const getBadgeStyles = (tier: string) => {
    switch (tier) {
      case 'Legend':
        return {
          container: 'legend-badge bg-gradient-to-r from-luxury-gold via-yellow-400 to-luxury-gold border-luxury-gold shadow-glow',
          text: 'text-luxury-charcoal font-bold',
          icon: '👑'
        };
      case 'Elite Ready':
        return {
          container: 'elite-badge bg-gradient-to-r from-luxury-purple via-purple-500 to-luxury-purple border-luxury-purple shadow-glow',
          text: 'text-white font-bold',
          icon: '⭐'
        };
      case 'Ascended':
        return {
          container: 'bg-gradient-to-r from-purple-600 to-purple-800 border-purple-500 shadow-luxury',
          text: 'text-white font-semibold',
          icon: '🚀'
        };
      case 'Verified Pawprint':
        return {
          container: 'bg-gradient-to-r from-blue-600 to-blue-800 border-blue-500 shadow-luxury',
          text: 'text-white font-semibold',
          icon: '✓'
        };
      default: // Viewer
        return {
          container: 'bg-gradient-to-r from-gray-600 to-gray-800 border-gray-500 shadow-glass',
          text: 'text-white font-medium',
          icon: '👁️'
        };
    }
  };

  const styles = getBadgeStyles(tier);

  return (
    <div
      className={`
        inline-flex items-center px-4 py-2 rounded-full border-2 luxury-transition
        ${styles.container}
        ${isUpgrading ? 'tier-upgrade' : ''}
        animate-scale-in
      `}
    >
      <span className="mr-2 text-lg">{styles.icon}</span>
      <span className={`text-sm ${styles.text}`}>
        {tier}
      </span>
      
      {tier === 'Legend' && (
        <div className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse" />
      )}
      
      {tier === 'Elite Ready' && (
        <div className="ml-2 animate-spin">
          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
        </div>
      )}
    </div>
  );
};

export default LuxuryTierBadge;