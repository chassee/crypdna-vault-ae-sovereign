import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Heart, Zap, Plus, Settings, Lock, Unlock } from 'lucide-react';

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
      {/* Billionaire-tier Header */}
      <div className="text-center space-y-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-3xl blur-xl animate-pulse" />
        <div className="relative">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-shimmer">
            🤖 Crypb0ts Emotional AI Sync
          </h2>
          <p className="text-muted-foreground text-lg mt-2">
            Your billionaire-class AI companions for emotional financial mastery
          </p>
        </div>
      </div>

      {/* Subscription Upgrade Banner */}
      <Card className="luxury-card border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse" />
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Ascend to Elite Tier</h3>
                <p className="text-purple-200 text-sm">Early access to Crypb0ts & NeuroTech features</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
              Upgrade Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Elite Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="luxury-card border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
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
                <span>AI Core:</span>
                <Badge variant="outline" className="border-purple-400/50">v2.1 Quantum</Badge>
              </div>
              <div className="flex justify-between text-xs">
                <span>Sync Status:</span>
                <span className="text-purple-400">🔘 Neural Link Ready</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-card border-pink-500/20 hover:border-pink-400/40 transition-all duration-500 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
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
                <span>Processing:</span>
                <Badge variant="outline" className="border-pink-400/50">Quantum Core</Badge>
              </div>
              <div className="flex justify-between text-xs">
                <span>Accuracy:</span>
                <span className="text-pink-400">99.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-card border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
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
                <span>Response:</span>
                <Badge variant="outline" className="border-blue-400/50">&lt;0.1ms</Badge>
              </div>
              <div className="flex justify-between text-xs">
                <span>Coverage:</span>
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
              <CardDescription className="text-gray-400">Manage your AI financial companions</CardDescription>
            </div>
            <Button onClick={addCrypbot} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
              <Plus className="w-4 h-4 mr-2" />
              Deploy New Crypbot
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-spin">
                <div className="w-full h-full rounded-full border-4 border-transparent border-t-white animate-spin" />
              </div>
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
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-white">{bot.bot_name}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Tier:</span>
                        <Badge variant="outline" className="border-purple-400/50">{bot.tier}</Badge>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Deployed:</span>
                        <span className="text-purple-400">{new Date(bot.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-green-400">🟢 Neural Link Active</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-4/5 animate-pulse" />
                    </div>
                    <p className="text-xs text-gray-400">Emotional calibration: 87%</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Lock className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Coming Soon: Elite Crypb0ts
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Your first AI companion will be deployed with Drop 2. Prepare for unparalleled emotional financial intelligence.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-purple-400">
                <Unlock className="w-4 h-4" />
                <span>Unlock at Verified Pawprint tier</span>
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
                <p className="text-sm italic text-gray-200 leading-relaxed">
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