import React, { useState, useEffect } from 'react';
import { Activity, ArrowUpCircle, ArrowDownCircle, CreditCard, Gift, TrendingUp, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const CreditActivity = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreditActivity();
  }, []);

  const fetchCreditActivity = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Display default activities for now (will be replaced with real data from credit_activity table)
      setActivities([
        { id: 1, event_type: 'Credit', description: 'Credit line increase approved', amount: 15000, created_at: new Date().toISOString() },
        { id: 2, event_type: 'Rewards', description: 'Premium rewards earned', amount: 347, created_at: new Date().toISOString() },
        { id: 3, event_type: 'Tradeline', description: 'Tradeline boost activated', amount: 75, created_at: new Date().toISOString() },
        { id: 4, event_type: 'Payment', description: 'Auto-payment processed', amount: 2450, created_at: new Date().toISOString() },
        { id: 5, event_type: 'Benefit', description: 'Vault tier upgrade qualified', amount: 0, created_at: new Date().toISOString() },
      ]);
    } catch (error) {
      console.error('Error in fetchCreditActivity:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'Credit':
        return <ArrowUpCircle className="w-4 h-4" />;
      case 'Rewards':
        return <Gift className="w-4 h-4" />;
      case 'Tradeline':
        return <TrendingUp className="w-4 h-4" />;
      case 'Payment':
        return <ArrowDownCircle className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  // Show mystery message instead of loading
  return (
    <div className="luxury-card hover-card relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
      <div className="p-6 relative z-10">
        <h3 className="text-lg font-semibold mb-4 text-foreground border-b-2 border-luxury-purple inline-block pb-1">
          Credit Activity
        </h3>
        <div className="relative overflow-hidden">
          {/* Blurred placeholder content */}
          <div className="space-y-3 opacity-30 blur-sm">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  <div>
                    <div className="h-4 bg-foreground/20 rounded w-32 mb-1"></div>
                    <div className="h-3 bg-muted-foreground/20 rounded w-24"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-4 bg-foreground/20 rounded w-16 mb-1"></div>
                  <div className="h-3 bg-muted-foreground/20 rounded w-12"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mystery overlay */}
          <div className="absolute inset-0 mystery-blur flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="relative lock-glow">
                <Lock className="w-10 h-10 text-purple-400 mx-auto animate-pulse" />
                <div className="absolute inset-0 w-10 h-10 mx-auto border border-purple-400/50 rounded-lg animate-ping" />
              </div>
              <div className="text-sm text-purple-300 font-medium tracking-wider">SYNCED TO VAULT – MYSTERY MODE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditActivity;