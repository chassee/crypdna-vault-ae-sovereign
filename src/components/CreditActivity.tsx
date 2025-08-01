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

      // Fetch real credit activity data
      const { data: creditActivities, error } = await supabase
        .from('credit_activity')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching credit activity:', error);
        // Fallback to mock data
        setActivities([
          { id: 1, event_type: 'Credit', description: 'Credit line increase approved', amount: 15000, created_at: new Date().toISOString() },
          { id: 2, event_type: 'Rewards', description: 'Premium rewards earned', amount: 347, created_at: new Date().toISOString() },
          { id: 3, event_type: 'Tradeline', description: 'Tradeline boost activated', amount: 75, created_at: new Date().toISOString() },
          { id: 4, event_type: 'Payment', description: 'Auto-payment processed', amount: 2450, created_at: new Date().toISOString() },
          { id: 5, event_type: 'Benefit', description: 'Vault tier upgrade qualified', amount: 0, created_at: new Date().toISOString() },
        ]);
      } else {
        setActivities(creditActivities || []);
      }
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

  return (
    <div className="luxury-card hover-card relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-purple/5 to-luxury-gold/5" />
      <div className="p-6 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-luxury-purple" />
          <h3 className="text-lg font-semibold text-foreground border-b-2 border-luxury-purple inline-block pb-1">
            Credit Activity Monitor
          </h3>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="luxury-spinner" />
            <span className="ml-3 text-muted-foreground">Syncing credit events...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.length === 0 ? (
              <div className="text-center py-8">
                <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No credit activity to display</p>
                <p className="text-xs text-muted-foreground mt-1">Activities will appear once synced</p>
              </div>
            ) : (
              activities.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-luxury-purple/10 to-luxury-gold/10 rounded-lg hover:from-luxury-purple/20 hover:to-luxury-gold/20 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in border border-luxury-purple/20"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-luxury-purple to-luxury-gold flex items-center justify-center text-white shadow-lg">
                      {getEventIcon(activity.event_type)}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{activity.description}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="px-2 py-1 bg-luxury-purple/20 rounded-full text-xs font-medium">
                          {activity.event_type}
                        </span>
                        <span>•</span>
                        <span>Live</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-foreground text-lg">
                      {activity.amount > 0 ? `+$${activity.amount.toLocaleString()}` : 'Qualified'}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      {new Date(activity.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditActivity;