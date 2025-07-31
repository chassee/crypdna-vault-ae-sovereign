import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
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

  if (loading) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <Activity className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold text-gray-800">Credit Activity History</h3>
      </div>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No credit activity yet</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  activity.event_type === 'Credit' ? 'bg-green-500' :
                  activity.event_type === 'Rewards' ? 'bg-blue-500' :
                  activity.event_type === 'Tradeline' ? 'bg-purple-500' :
                  activity.event_type === 'Payment' ? 'bg-orange-500' : 'bg-gray-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-800">{activity.description}</p>
                  <p className="text-xs text-gray-600">{activity.event_type} • {new Date(activity.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${
                  activity.event_type === 'Credit' || activity.event_type === 'Rewards' || activity.event_type === 'Tradeline' 
                    ? 'text-green-600' 
                    : activity.event_type === 'Payment' 
                    ? 'text-gray-800' 
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
          ))
        )}
      </div>
    </div>
  );
};

export default CreditActivity;