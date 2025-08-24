import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import VaultStats from './VaultStats';

interface Balance {
  balance: number;
  pending_balance?: number;
  card_balance?: number;
  available_credit?: number;
  cash_back_rate?: number;
  monthly_limit?: number;
  score_boost?: number;
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  timestamp: string;
  type: string;
}

const BalanceBreakdown = () => {
  const [balance, setBalance] = useState<Balance | null>(null);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get balance from balances table
      const { data: balanceData, error: balanceError } = await supabase
        .from('balances')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      // Get last transaction
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

      setBalance(balanceData);
      setLastTransaction(lastTransaction);
    } catch (error) {
      console.error('Error in fetchBalance:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);

  if (loading) {
    return (
      <Card className="vault-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Balance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const stats = [
    {
      label: 'Available',
      value: formatCurrency(balance?.balance || 0),
      change: balance?.score_boost ? `+${balance.score_boost} boost` : undefined,
      trend: 'up' as const
    },
    {
      label: 'Pending',
      value: formatCurrency(balance?.pending_balance || 0)
    },
    {
      label: 'Credit',
      value: formatCurrency(balance?.available_credit || 0)
    },
    {
      label: 'Rate',
      value: `${balance?.cash_back_rate || 0}%`
    }
  ];

  return (
    <Card className="vault-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <VaultStats stats={stats} />
        
        {lastTransaction && (
          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-sm text-muted-foreground mb-2">Latest</div>
            <div className="flex justify-between items-center">
              <span className="font-medium">{lastTransaction.description}</span>
              <span className={`font-mono font-semibold ${
                lastTransaction.type === 'credit' ? 'text-vault-success' : 'text-foreground'
              }`}>
                {lastTransaction.type === 'credit' ? '+' : ''}{formatCurrency(Math.abs(lastTransaction.amount))}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BalanceBreakdown;