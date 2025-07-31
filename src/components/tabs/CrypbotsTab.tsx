import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Heart, Zap, Plus, Settings } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent">
          Crypb0ts Emotional AI
        </h2>
        <p className="text-muted-foreground text-lg">
          Your personalized AI companions for emotional financial guidance
        </p>
      </div>

      {/* Feature Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="luxury-card border-luxury-purple/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-luxury-purple" />
              Emotional Sync
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Real-time emotional analysis for personalized financial advice
            </p>
            <Badge variant="secondary" className="mt-2">Coming Soon</Badge>
          </CardContent>
        </Card>

        <Card className="luxury-card border-luxury-purple/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-luxury-purple" />
              Smart Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              AI-powered spending patterns and credit optimization
            </p>
            <Badge variant="secondary" className="mt-2">Beta</Badge>
          </CardContent>
        </Card>

        <Card className="luxury-card border-luxury-purple/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-luxury-purple" />
              Instant Advice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              24/7 financial coaching tailored to your emotional state
            </p>
            <Badge variant="secondary" className="mt-2">Preview</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Current Crypbots */}
      <Card className="luxury-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Your Crypb0ts</CardTitle>
              <CardDescription>Manage your AI companions</CardDescription>
            </div>
            <Button onClick={addCrypbot} className="luxury-button">
              <Plus className="w-4 h-4 mr-2" />
              Add Crypbot
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="luxury-spinner mx-auto mb-4" />
              <p className="text-muted-foreground">Loading your Crypb0ts...</p>
            </div>
          ) : crypbots.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {crypbots.map((bot) => (
                <Card key={bot.id} className="border-luxury-purple/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{bot.bot_name}</h3>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                    <Badge variant="outline" className="mb-2">{bot.tier}</Badge>
                    <p className="text-xs text-muted-foreground">
                      Created {new Date(bot.created_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Brain className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Crypb0ts Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first AI companion to get personalized financial advice
              </p>
              <Button onClick={addCrypbot} className="luxury-button">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Crypbot
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card className="luxury-card border-luxury-gold/20">
        <CardHeader>
          <CardTitle className="text-luxury-gold">Emotional Finance Preview</CardTitle>
          <CardDescription>Experience the future of AI-powered financial advice</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-luxury-purple/10 border border-luxury-purple/20">
            <p className="text-sm italic">
              "Based on your current emotional state and spending patterns, I recommend postponing 
              that luxury purchase until next month. Your stress levels suggest focusing on 
              building your emergency fund first." - Crypbot Luna
            </p>
          </div>
          <div className="flex justify-center">
            <Badge variant="secondary">AI Response Example</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrypbotsTab;