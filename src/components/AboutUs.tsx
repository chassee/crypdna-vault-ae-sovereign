import React from 'react';
import { Shield, Zap, Brain, TrendingUp, Lock, Sparkles } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent">
          CrypDNA Vault – Billionaire-Class Future
        </h1>
        <p className="text-xl text-foreground max-w-4xl mx-auto leading-relaxed">
          "CrypDNA Vault is building a future where surreal fashion, credit building, emotional AI, and neurotech fuse into one luxury ecosystem. We are unlocking billion-dollar tradelines, brain-computer product unlocks, and AI companions—redefining what it means to live 10 steps ahead."
        </p>
      </div>

      {/* Evolution Timeline */}
      <div className="luxury-card p-8">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center border-b-2 border-luxury-purple inline-block pb-2 w-full">
          The Evolution: From Digital Art to Neural Reality
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Phase 1: NFTs */}
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground text-center">Phase 1: Crypdawgs NFTs</h3>
            <p className="text-muted-foreground text-center">
              Started as groundbreaking digital collectibles that captured the imagination of the crypto world. Each Crypdawg was a unique digital DNA experiment.
            </p>
          </div>

          {/* Phase 2: Fashion */}
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground text-center">Phase 2: Luxury Fashion</h3>
            <p className="text-muted-foreground text-center">
              Evolved into high-end fashion experiences—duffles, truckers, and vinyl exclusives that bridge digital ownership with premium physical goods.
            </p>
          </div>

          {/* Phase 3: AI Companions */}
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mx-auto">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground text-center">Phase 3: Crypb0ts AI</h3>
            <p className="text-muted-foreground text-center">
              Transformed into emotional AI companions that sync with your moods, understand your patterns, and adapt to your lifestyle in real-time.
            </p>
          </div>

          {/* Phase 4: NeuroTech */}
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground text-center">Phase 4: Neural Interface</h3>
            <p className="text-muted-foreground text-center">
              The future: Direct brain-computer interfaces that unlock products through thought patterns, emotions, and neural signatures.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="luxury-card p-8 bg-gradient-to-r from-luxury-purple/10 to-luxury-gold/10 border-luxury-purple/20">
        <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Our Mission</h2>
        <p className="text-lg text-foreground text-center max-w-3xl mx-auto leading-relaxed">
          To create a parallel ecosystem where the digital and physical worlds merge through advanced technology, luxury experiences, and emotional intelligence. We're not just building products—we're architecting the future of human-AI collaboration.
        </p>
      </div>

      {/* Vision & Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vision */}
        <div className="luxury-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-luxury-purple" />
            <h3 className="text-2xl font-bold text-foreground">Vision</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            A world where consciousness and technology harmonize to unlock human potential. Where your thoughts can unlock exclusive experiences, your emotions guide AI companions, and your neural patterns become the ultimate luxury credential.
          </p>
        </div>

        {/* The Future */}
        <div className="luxury-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-6 h-6 text-luxury-gold" />
            <h3 className="text-2xl font-bold text-foreground">The Future</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Billion-dollar tradelines accessible through neural verification. AI companions that evolve with your consciousness. Fashion that adapts to your brainwaves. Credit systems that recognize neural patterns. This isn't science fiction—it's the CrypDNA roadmap.
          </p>
        </div>
      </div>

      {/* Mysterious Footer */}
      <div className="luxury-card bg-gradient-to-r from-black/50 to-luxury-purple/20 border-luxury-purple/30 p-8 text-center">
        <h3 className="text-2xl font-bold text-foreground mb-4">The Code is in Your DNA</h3>
        <p className="text-muted-foreground italic">
          "Some secrets can only be unlocked by those who understand that the future isn't arriving—it's already here, waiting for minds ready to decode it."
        </p>
        <div className="mt-6 text-xs text-luxury-purple/70">
          Access Level: Vault Member | Neural Sync: Active | Status: Initiated
        </div>
      </div>
    </div>
  );
};

export default AboutUs;