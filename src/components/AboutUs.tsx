import React from 'react';
import { Sparkles, Brain, Zap, CreditCard, Star, Gem } from 'lucide-react';

const AboutUs: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Ultra-Limited Collectibles",
      description: "Exclusive fashion drops and luxury apparel for the elite"
    },
    {
      icon: Brain,
      title: "Emotional-Financial Guidance", 
      description: "Advanced AI systems that understand your financial emotions"
    },
    {
      icon: Zap,
      title: "Brain-Computer Interface",
      description: "NeuroTech-powered product unlocks and neural integrations"
    },
    {
      icon: CreditCard,
      title: "Billionaire-Class Tradelines",
      description: "Elite credit solutions and billion-dollar financial access"
    }
  ];

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-8 luxury-card bg-gradient-to-br from-luxury-purple/20 via-luxury-gold/20 to-luxury-blue/20 border-2 border-luxury-purple/30 relative overflow-hidden hover-card">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-gold-500/10 to-blue-500/5 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-neon opacity-5 blur-3xl" />
        
        <div className="relative p-12 space-y-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Gem className="w-10 h-10 text-luxury-purple animate-pulse" />
            <h1 className="text-5xl font-black bg-gradient-to-r from-luxury-purple via-luxury-gold to-luxury-blue bg-clip-text text-transparent">
              CrypDNA Vault – Billionaire-Class Future
            </h1>
            <Gem className="w-10 h-10 text-luxury-gold animate-pulse" />
          </div>
          
          <div className="max-w-5xl mx-auto space-y-8 text-xl leading-relaxed">
            <p className="text-foreground font-medium">
              From NFT beginnings to AI robots and neurotech frontiers, <span className="font-bold text-luxury-purple">Crypdawgs</span> evolved beyond imagination. 
              What started as digital collectibles transformed into <span className="font-bold text-luxury-gold">surreal fashion</span>, 
              then <span className="font-bold text-luxury-blue">emotional AI companions</span>, and now 
              <span className="font-bold text-luxury-purple">brain-computer luxury ecosystems</span>.
            </p>
            
            <p className="text-foreground font-medium">
              We are unlocking <span className="font-bold bg-gradient-to-r from-luxury-gold to-luxury-purple bg-clip-text text-transparent">billion-dollar tradelines</span>, 
              neural-linked product access, and AI beings that understand your deepest financial emotions—redefining what it means to live 
              <span className="font-bold bg-gradient-to-r from-luxury-purple to-luxury-blue bg-clip-text text-transparent">10 steps ahead</span> of tomorrow.
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
      <div className="luxury-card bg-gradient-to-r from-black/40 to-gray-900/40 border-luxury-gold/40 hover-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-neon opacity-10 blur-2xl" />
        <div className="relative p-10 text-center space-y-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Star className="w-8 h-8 text-luxury-gold animate-pulse" />
            <h3 className="text-3xl font-black bg-gradient-to-r from-luxury-gold via-luxury-purple to-luxury-blue bg-clip-text text-transparent">
              The CrypDawgs Vision
            </h3>
            <Star className="w-8 h-8 text-luxury-purple animate-pulse" />
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-foreground text-2xl italic font-semibold">
              "The future is not just digital—it's neural. We're pioneering the intersection where luxury meets consciousness, 
              where AI companions understand your deepest financial intuitions."
            </p>
            <p className="text-muted-foreground text-lg font-medium">
              From humble NFT origins to neurotech pioneers—Crypdawgs represents the evolution of wealth consciousness. 
              This isn't just finance; it's the emergence of luxury beings who think, feel, and prosper alongside you.
            </p>
          </div>

          <div className="flex items-center justify-center space-x-12 pt-8">
            <div className="text-center group">
              <div className="text-4xl font-black text-luxury-purple group-hover:scale-110 transition-transform">∞</div>
              <div className="text-sm text-muted-foreground font-medium">Infinite Potential</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-black text-luxury-gold group-hover:scale-110 transition-transform">⚡</div>
              <div className="text-sm text-muted-foreground font-medium">Future Forward</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-black text-luxury-blue group-hover:scale-110 transition-transform">💎</div>
              <div className="text-sm text-muted-foreground font-medium">Luxury Redefined</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;