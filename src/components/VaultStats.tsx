import React from 'react';

interface VaultStatsProps {
  stats: Array<{
    label: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
  }>;
}

const VaultStats: React.FC<VaultStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="vault-stat">
          <div className="vault-stat-value">{stat.value}</div>
          <div className="vault-stat-label">{stat.label}</div>
          {stat.change && (
            <div className={`text-xs font-medium ${
              stat.trend === 'up' ? 'text-vault-success' : 
              stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
            }`}>
              {stat.change}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VaultStats;