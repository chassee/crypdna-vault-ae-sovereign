import React from 'react';
import { Brain, Bot, Zap, Eye } from 'lucide-react';

const VaultFutureTech: React.FC = () => {
  const futureTechItems = [
    {
      id: 1,
      title: 'Experian Credit Intelligence',
      description: 'Real-time credit monitoring with AI-powered insights and predictive analytics.',
      icon: Brain,
      status: 'Integration Ready',
      eta: 'Q1 2025',
      features: ['Real-time Monitoring', 'AI Insights', 'Score Prediction', 'Alert System']
    },
    {
      id: 2,
      title: 'Equifax Risk Assessment',
      description: 'Advanced risk modeling using machine learning and consumer behavior analysis.',
      icon: Zap,
      status: 'Testing Phase',
      eta: 'Q2 2025',
      features: ['Risk Modeling', 'Behavior Analysis', 'Credit Forecasting', 'Portfolio Optimization']
    },
    {
      id: 3,
      title: 'TransUnion Data Fusion',
      description: 'Comprehensive financial profiling through multi-bureau data integration.',
      icon: Eye,
      status: 'Development',
      eta: 'Q3 2025',
      features: ['Multi-Bureau Sync', 'Identity Verification', 'Fraud Detection', 'Account Aggregation']
    },
    {
      id: 4,
      title: 'Blockchain Identity Vault',
      description: 'Decentralized identity management with cryptographic security and self-sovereignty.',
      icon: Bot,
      status: 'Research',
      eta: 'Q4 2025',
      features: ['Self-Sovereign ID', 'Zero-Knowledge Proofs', 'Biometric Authentication', 'Multi-Chain Support']
    },
    {
      id: 5,
      title: 'AI Portfolio Risk Management',
      description: 'Intelligent portfolio optimization using quantum algorithms and market sentiment.',
      icon: Brain,
      status: 'Prototype',
      eta: 'Q1 2026',
      features: ['Quantum Algorithms', 'Sentiment Analysis', 'Risk Optimization', 'Automated Rebalancing']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Development':
        return 'text-green-400 bg-green-400/20';
      case 'Prototype':
        return 'text-blue-400 bg-blue-400/20';
      case 'Research Phase':
        return 'text-purple-400 bg-purple-400/20';
      case 'Conceptual':
        return 'text-orange-400 bg-orange-400/20';
      default:
        return 'text-muted-foreground bg-muted/20';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent">
          Future Technology Preview
        </h3>
        <p className="text-muted-foreground">Glimpse into the next generation of financial technology</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {futureTechItems.map((item) => {
          const IconComponent = item.icon;
          const statusColor = getStatusColor(item.status);
          
          return (
            <div
              key={item.id}
              className="luxury-card group hover:scale-[1.02] luxury-transition hover:shadow-glow cursor-pointer future-tech-glow"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-luxury-purple to-luxury-gold flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{item.title}</h4>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-luxury-gold">ETA</div>
                    <div className="text-xs text-muted-foreground">{item.eta}</div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{item.description}</p>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Key Features</div>
                  <div className="grid grid-cols-2 gap-2">
                    {item.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-luxury-purple" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center justify-center gap-2 text-sm text-luxury-purple font-medium">
                    <Zap className="w-4 h-4" />
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="luxury-card bg-gradient-to-r from-luxury-purple/10 to-luxury-gold/10 border-luxury-purple/20">
        <div className="p-6 text-center space-y-4">
          <div className="text-4xl animate-pulse">🔮</div>
          <h4 className="text-xl font-semibold">Join the Future</h4>
          <p className="text-muted-foreground max-w-md mx-auto">
            Be among the first to experience revolutionary financial technology. 
            Your Vault tier determines early access privileges.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-luxury-gold" />
              <span className="text-luxury-gold">Legend: First Access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-luxury-purple" />
              <span className="text-luxury-purple">Elite: Beta Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultFutureTech;