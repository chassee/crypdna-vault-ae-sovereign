import React, { useState, useEffect } from 'react';
import { Activity, ArrowUpCircle, ArrowDownCircle, CreditCard, Gift, TrendingUp } from 'lucide-react';
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

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm hover-card">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-xl bg-white/80 shadow-sm border border-gray-100">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm hover-card">
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="w-6 h-6 text-luxury-purple" />
        <h3 className="text-xl font-bold text-dark-grey border-b-2 border-luxury-purple inline-block pb-1">Credit Activity</h3>
      </div>
      <div className="space-y-3">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No credit activity yet</p>
          </div>
        ) : (
          activities.map((activity) => {
            const isPositive = activity.event_type === 'Credit' || activity.event_type === 'Rewards';
            const icon = getEventIcon(activity.event_type);
            
            return (
              <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-xl bg-white/90 hover:bg-white/95 luxury-transition shadow-sm border border-gray-100 hover-card wallet-row">
                <div className={`p-2.5 rounded-full ${isPositive ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-dark-grey truncate">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {activity.event_type} • {new Date(activity.created_at).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-sm ${
                    activity.event_type === 'Credit' || activity.event_type === 'Rewards' || activity.event_type === 'Tradeline' 
                      ? 'text-green-600' 
                      : activity.event_type === 'Payment' 
                      ? 'text-dark-grey' 
                      : 'text-orange-600'
                  }`}>
                    {activity.event_type === 'Credit' && `+$${activity.amount?.toLocaleString()}`}
                    {activity.event_type === 'Rewards' && `+${activity.amount} pts`}
                    {activity.event_type === 'Tradeline' && `+${activity.amount} pts`}
                    {activity.event_type === 'Payment' && `$${activity.amount?.toLocaleString()}`}
                    {activity.event_type === 'Benefit' && 'Qualified'}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CreditActivity;