
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const BalanceBreakdown = () => {
  const [balance, setBalance] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get balance from balances table and last transaction from vault_transactions
      const { data: balanceData, error: balanceError } = await supabase
        .from('balances')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      // Get last transaction from transactions table (vault_transactions not in types yet)
      let lastTransaction = null;
      try {
        const { data: transactionData } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('timestamp', { ascending: false })
          .limit(1)
          .maybeSingle();
        lastTransaction = transactionData;
      } catch (error) {
        console.log('Error fetching transactions:', error);
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
      <div className="bg-white rounded-2xl p-6 border border-gray-300">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded"></div>
            <div className="h-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const availableBalance = balance?.available_credit || 0;
  const pendingBalance = balance?.pending_balance || 0;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-300 mt-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">💳 Balance Breakdown</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Available Balance</span>
          <span className="text-xl font-bold text-green-600">${availableBalance.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Pending Balance</span>
          <span className="text-xl font-bold text-orange-600">${pendingBalance.toLocaleString()}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Card Balance</span>
            <span className="text-sm font-medium text-gray-800">${(balance?.card_balance || 0).toLocaleString()}</span>
          </div>
        </div>

        {balance?.lastTransaction && (
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Last Transaction</h4>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-600">{balance.lastTransaction.description || 'Transaction'}</span>
                <p className="text-xs text-gray-500">{new Date(balance.lastTransaction.timestamp).toLocaleDateString()}</p>
              </div>
              <span className={`text-sm font-medium ${
                balance.lastTransaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
              }`}>
                {balance.lastTransaction.type === 'credit' ? '+' : '-'}${balance.lastTransaction.amount.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceBreakdown;
