import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Heart, Zap, Plus, Settings, Lock, Unlock } from 'lucide-react';
import CrypbotManagement from '../CrypbotManagement';

const CrypbotsTab = () => {
  const [crypbots, setCrypbots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrypbots();
  }, []);

  const fetchCrypbots = async () => {
    try {
      const { data, error } = await supabase
        .from('crypbots')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setCrypbots(data || []);
    } catch (error) {
      console.error('Error fetching crypbots:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCrypbot = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const newBot = {
        user_id: user.id,
        bot_name: `Crypbot ${crypbots.length + 1}`,
        tier: 'Base'
      };

      const { error } = await supabase
        .from('crypbots')
        .insert([newBot]);

      if (error) throw error;
      fetchCrypbots();
    } catch (error) {
      console.error('Error adding crypbot:', error);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-foreground border-b-2 border-luxury-purple inline-block pb-1">
          Crypb0ts AI Companions
        </h3>
        <p className="text-muted-foreground">Your personal AI beings with emotional intelligence</p>
      </div>

      {/* Emotional AI Sync Preview */}
      <div className="luxury-card bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 hover-card">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-400" />
              Emotional AI Sync
            </h4>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Elite Tier Unlocks Soon
            </span>
          </div>
          <p className="text-muted-foreground">
            Advanced emotional intelligence synchronization with your AI companion. Real-time mood analysis and response adaptation.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-background/50 rounded-lg p-3">
              <div className="text-sm font-medium text-muted-foreground">Sync Status</div>
              <div className="text-lg font-bold text-blue-400">Preparing...</div>
            </div>
            <div className="bg-background/50 rounded-lg p-3">
              <div className="text-sm font-medium text-muted-foreground">AI Core</div>
              <div className="text-lg font-bold text-purple-400">v3.0</div>
            </div>
          </div>
        </div>
      </div>

      {/* Elite Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="luxury-card border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Heart className="w-5 h-5 text-purple-400 group-hover:animate-pulse" />
              Emotional Sync
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Neural-linked emotional analysis for billionaire-class financial intuition
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-foreground">AI Core:</span>
                <Badge variant="outline" className="border-purple-400/50">v2.1 Quantum</Badge>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-foreground">Sync Status:</span>
                <span className="text-purple-400">🔘 Neural Link Ready</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-card border-pink-500/20 hover:border-pink-400/40 transition-all duration-500 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Brain className="w-5 h-5 text-pink-400 group-hover:animate-pulse" />
              Quantum Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Predictive AI for trillion-dollar market movements and portfolio optimization
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-foreground">Processing:</span>
                <Badge variant="outline" className="border-pink-400/50">Quantum Core</Badge>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-foreground">Accuracy:</span>
                <span className="text-pink-400">99.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-card border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Zap className="w-5 h-5 text-blue-400 group-hover:animate-pulse" />
              Real-time Oracle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Instant multi-dimensional financial guidance across global markets
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-foreground">Response:</span>
                <Badge variant="outline" className="border-blue-400/50">&lt;0.1ms</Badge>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-foreground">Coverage:</span>
                <span className="text-blue-400">247 Markets</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Crypbots Elite Collection */}
      <Card className="luxury-card bg-gradient-to-br from-gray-900/50 to-black/50 border-gray-700/30 backdrop-blur-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your Elite Crypb0ts Collection
              </CardTitle>
              <CardDescription className="text-muted-foreground">Manage your AI financial companions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CrypbotManagement 
            onCrypbotAdded={fetchCrypbots}
            onCrypbotDeleted={fetchCrypbots}
            crypbots={crypbots}
          />
          {loading ? (
            <div className="text-center py-12">
              <div className="luxury-spinner mx-auto mb-4" />
              <p className="text-muted-foreground">Initializing quantum neural networks...</p>
            </div>
          ) : crypbots.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crypbots.map((bot) => (
                <Card key={bot.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-gray-400">
                        <Lock className="w-4 h-4" />
                      </div>
                    </div>
                     <h3 className="font-bold text-lg mb-2 text-foreground">{bot.bot_name}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Tier:</span>
                        <Badge variant="outline" className="border-purple-400/50">{bot.tier}</Badge>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Deployed:</span>
                        <span className="text-purple-400">{new Date(bot.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="text-green-400">🟢 Neural Link Active</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-4/5 animate-pulse" />
                    </div>
                    <p className="text-xs text-muted-foreground">Emotional calibration: 87%</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="luxury-card bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent backdrop-blur-sm" />
                <div className="p-8 space-y-4 relative z-10">
                  <div className="relative">
                    <Brain className="w-12 h-12 text-purple-400 mx-auto" />
                    <Lock className="w-8 h-8 text-purple-400 absolute top-0 right-1/2 translate-x-1/2 -translate-y-2 animate-pulse" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground">Crypb0ts Awaiting Deployment</h4>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Create your first AI companion to begin the emotional sync journey.
                  </p>
                  <p className="text-xs text-purple-400 mt-2">Ready for deployment</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Response Preview */}
      <Card className="luxury-card border-gradient bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20 backdrop-blur-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 animate-pulse" />
        <CardHeader className="relative">
          <CardTitle className="text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Elite AI Response Preview
          </CardTitle>
          <CardDescription>Experience billionaire-class emotional financial guidance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 relative">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm italic text-foreground leading-relaxed">
                  "Neural analysis indicates elevated cortisol levels coinciding with market volatility. 
                  Recommend deploying $2.3M across defensive positions while your stress patterns normalize. 
                  Your emotional-financial DNA suggests maximum alpha generation in 72-hour recovery window."
                </p>
                <p className="text-xs text-purple-400 mt-3 font-medium">- Crypbot Luna v2.1 • Quantum Core</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30">
              🧠 Elite AI Response • Emotional-Financial Synthesis
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrypbotsTab;