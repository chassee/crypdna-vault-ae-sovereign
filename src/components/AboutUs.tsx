import React from 'react';
import { Sparkles, Brain, Zap, CreditCard, Star, Gem } from 'lucide-react';

const AboutUs: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Exclusive Fashion Drops",
      description: "Ultra-limited collectibles and luxury apparel"
    },
    {
      icon: Brain,
      title: "AI Emotional Intelligence", 
      description: "Advanced emotional-financial guidance systems"
    },
    {
      icon: Zap,
      title: "NeuroTech Integrations",
      description: "Brain-computer interface product unlocks"
    },
    {
      icon: CreditCard,
      title: "Elite Credit Solutions",
      description: "Billionaire-class tradelines and credit access"
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-6 luxury-card bg-gradient-to-br from-luxury-purple/20 via-luxury-gold/20 to-luxury-purple/20 border-2 border-luxury-purple/30 relative overflow-hidden hover-card">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 animate-pulse" />
        <div className="relative p-8 space-y-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Gem className="w-8 h-8 text-luxury-purple animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent">
              CrypDNA Vault – Billionaire-Class Future
            </h1>
            <Gem className="w-8 h-8 text-luxury-gold animate-pulse" />
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed">
            <p className="text-foreground/90">
              CrypDNA Vault is the <span className="font-bold text-luxury-purple">surreal luxury financial ecosystem</span> by Crypdawgs. 
              We merge exclusive fashion drops, AI emotional intelligence, NeuroTech integrations, and elite credit solutions into one universe.
            </p>
            
            <p className="text-foreground/90">
              Over the next few years, our ecosystem will deliver <span className="font-bold text-luxury-gold">billionaire-class tradelines</span>, 
              surreal AI companions, emotional-financial guidance, and NeuroTech-powered product unlocks.
            </p>
            
            <p className="text-foreground/90">
              From luxury fashion to emotional AI credit scoring, every detail is designed to keep our members 
              <span className="font-bold bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent"> 10 steps ahead</span>. 
              Crypdawgs is building a future where luxury, credit, and intelligent tech fuse into one seamless experience.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="luxury-card group hover:scale-[1.02] luxury-transition hover:shadow-glow relative overflow-hidden border-luxury-purple/20 hover-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Icon className="w-8 h-8 text-luxury-purple group-hover:text-luxury-gold luxury-transition" />
                    <div className="absolute inset-0 w-8 h-8 border border-luxury-purple/30 rounded-lg opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-purple/5 to-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            </div>
          );
        })}
      </div>

      {/* Vision Statement */}
      <div className="luxury-card bg-gradient-to-r from-black/20 to-gray-900/20 border-luxury-gold/30 hover-card">
        <div className="p-8 text-center space-y-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="w-6 h-6 text-luxury-gold animate-pulse" />
            <h3 className="text-2xl font-bold text-luxury-gold">The Crypdawgs Vision</h3>
            <Star className="w-6 h-6 text-luxury-gold animate-pulse" />
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-foreground/90 text-lg italic">
              "Where financial evolution meets emotional intelligence, and luxury transcends the ordinary."
            </p>
            <p className="text-muted-foreground">
              Join the exclusive community of forward-thinking individuals who understand that the future of finance 
              is not just about numbers—it's about creating an ecosystem where technology, emotion, and luxury converge 
              to unlock unprecedented possibilities.
            </p>
          </div>

          <div className="flex items-center justify-center space-x-8 pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-luxury-purple">∞</div>
              <div className="text-xs text-muted-foreground">Infinite Potential</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-luxury-gold">⚡</div>
              <div className="text-xs text-muted-foreground">Future Forward</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-luxury-purple">💎</div>
              <div className="text-xs text-muted-foreground">Luxury Redefined</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;