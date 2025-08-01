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
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-purple-400 animate-pulse" />
          </div>
          <p className="text-muted-foreground italic">
            Your emotional-credit DNA is syncing. First activity reveals soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreditActivity;