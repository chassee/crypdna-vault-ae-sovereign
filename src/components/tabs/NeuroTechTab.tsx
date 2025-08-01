import React from 'react';
import { Brain, Lock, Zap, Activity, Cpu, Waves } from 'lucide-react';

const NeuroTechTab: React.FC = () => {
  const neuroFeatures = [
    {
      id: '1',
      title: 'NeuroLink Sync',
      description: 'Brain-computer interface integration',
      category: 'BCI Technology',
      status: 'Coming Soon'
    },
    {
      id: '2',
      title: 'Cognitive Enhancement',
      description: 'Memory and focus optimization',
      category: 'Neural Boost',
      status: 'Coming Soon'
    },
    {
      id: '3',
      title: 'Emotional DNA Mapping',
      description: 'Advanced sentiment analysis',
      category: 'Emotion AI',
      status: 'Coming Soon'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-foreground border-b-2 border-luxury-purple inline-block pb-1">
          NeuroTech Laboratory
        </h3>
        <p className="text-muted-foreground">Next-generation neural interface technology</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {neuroFeatures.map((feature) => (
          <div
            key={feature.id}
            className="luxury-card group hover:scale-[1.02] luxury-transition hover:shadow-glow relative overflow-hidden hover-card"
          >
            {/* Blurred neural pattern background */}
            <div className="relative h-48 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-lg blur-xl" />
                {/* Neural network pattern overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse" />
                </div>
              </div>
              
              {/* Mystery lock overlay */}
              <div className="absolute inset-0 mystery-blur flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="relative lock-glow">
                    <Brain className="w-10 h-10 text-cyan-400 mx-auto animate-pulse" />
                    <div className="absolute inset-0 w-10 h-10 mx-auto border border-cyan-400/50 rounded-lg animate-ping" />
                  </div>
                  <div className="text-sm text-cyan-300 font-medium tracking-wider">NEUROLINK FEATURES COMING SOON</div>
                </div>
              </div>

              {/* Status indicator */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-500">
                Alpha Phase
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-foreground">{feature.title}</h4>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25">
                    {feature.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
                <div className="text-xs text-muted-foreground">Category: {feature.category}</div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Activity className="w-4 h-4" />
                  <span>Neural Pattern Analysis</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-cyan-400">
                  <Zap className="w-3 h-3" />
                  <span>Beta Access</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coming Soon Banner */}
      <div className="luxury-card bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-400/20 hover-card">
        <div className="p-6 text-center space-y-4">
          <div className="text-4xl animate-pulse">🧠</div>
          <h4 className="text-xl font-semibold text-foreground">Neural Interface Protocol</h4>
          <p className="text-muted-foreground max-w-md mx-auto">
            Advanced brain-computer interface technology for vault members. Upgrade to Ascended Tier for early neural sync previews.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-cyan-400">
            <Cpu className="w-4 h-4" />
            <span>Quantum Neural Processing</span>
          </div>
        </div>
      </div>

      {/* Additional Mystery Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="luxury-card relative overflow-hidden">
          <div className="relative h-32 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
            <div className="absolute inset-0 mystery-blur flex items-center justify-center">
              <div className="text-center space-y-2">
                <Waves className="w-8 h-8 text-purple-400 mx-auto animate-pulse" />
                <div className="text-sm text-purple-300 font-medium">Brainwave Sync</div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h5 className="font-semibold text-foreground">Neural Harmonics</h5>
            <p className="text-sm text-muted-foreground">Synchronized brainwave patterns for enhanced cognition</p>
          </div>
        </div>

        <div className="luxury-card relative overflow-hidden">
          <div className="relative h-32 bg-gradient-to-br from-cyan-900/20 to-green-900/20">
            <div className="absolute inset-0 mystery-blur flex items-center justify-center">
              <div className="text-center space-y-2">
                <Activity className="w-8 h-8 text-cyan-400 mx-auto animate-pulse" />
                <div className="text-sm text-cyan-300 font-medium">Cognitive Boost</div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h5 className="font-semibold text-foreground">Memory Enhancement</h5>
            <p className="text-sm text-muted-foreground">Advanced neural pathways for improved recall</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuroTechTab;