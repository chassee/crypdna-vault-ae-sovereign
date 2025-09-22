
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/hooks/useLanguage';

const BalanceBreakdown = () => {
  const [balance, setBalance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const { t } = useLanguage(userId || undefined);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      setUserId(user.id);

      // Get balance from balances table
      const { data: balanceData, error: balanceError } = await supabase
        .from('balances')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      // Get last transaction from vault_transactions table  
      let lastTransaction = null;
      try {
        const { data: transactionData } = await supabase
          .from('vault_transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        lastTransaction = transactionData;
      } catch (error) {
        console.log('Error fetching vault transactions:', error);
      }

      if (balanceError && balanceError.code !== 'PGRST116') {
        console.error('Error fetching balance:', balanceError);
        return;
      }

      setBalance({ ...balanceData, lastTransaction });
    } catch (error) {
      console.error('Error in fetchBalance:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="luxury-card rounded-2xl p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            <div className="h-6 bg-muted rounded"></div>
            <div className="h-6 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const availableBalance = 0; // Mystery mode - show $0
  const pendingBalance = 0; // Mystery mode - show $0

  return (
    <div className="luxury-card rounded-2xl p-6 mt-6">
      <h3 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>💳 Balance Overview</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
          <span className="text-foreground font-medium">{t.available_balance}</span>
          <span className="text-xl font-bold text-green-500">${(balance?.balance || 0).toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-lg border border-orange-500/20">
          <span className="text-foreground font-medium">{t.pending_balance}</span>
          <span className="text-xl font-bold text-orange-500">${(balance?.pending_balance || 0).toLocaleString()}</span>
        </div>
        
        <div className="border-t border-border pt-4">
          <div className="flex justify-between items-center">
            <span className="text-foreground font-medium">Card Balance:</span>
            <span className="text-2xl font-bold text-luxury-purple">
              $0
            </span>
          </div>
        </div>

        {balance?.lastTransaction && (
          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-semibold mb-2 text-foreground">{t.recent_activity}</h4>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-foreground font-medium">{balance.lastTransaction.description || 'Transaction'}</span>
                <p className="text-xs text-muted-foreground">{new Date(balance.lastTransaction.created_at).toLocaleDateString()}</p>
              </div>
              <span className={`text-sm font-medium ${
                balance.lastTransaction.transaction_type === 'credit' ? 'text-green-500' : 'text-red-500'
              }`}>
                {balance.lastTransaction.transaction_type === 'credit' ? '+' : '-'}${balance.lastTransaction.amount.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceBreakdown;
