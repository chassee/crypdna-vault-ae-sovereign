import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Gift, Star, Trophy, Crown, Gem, ShoppingBag } from 'lucide-react';

const VaultRewardsTab = () => {
  const [rewards, setRewards] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      setRewards(data);
    } catch (error) {
      console.error('Error fetching rewards:', error);
    } finally {
      setLoading(false);
    }
  };

  const redeemableItems = [
    {
      id: 1,
      name: 'CrypDawgs Vinyl Record',
      points: 500,
      category: 'Collectible',
      icon: '🎵',
      available: true
    },
    {
      id: 2,
      name: 'Luxury Trucker Hat',
      points: 750,
      category: 'Apparel',
      icon: '🧢',
      available: true
    },
    {
      id: 3,
      name: 'Diamond Paw Pendant',
      points: 2000,
      category: 'Jewelry',
      icon: '💎',
      available: false
    },
    {
      id: 4,
      name: 'VIP Event Access',
      points: 1500,
      category: 'Experience',
      icon: '🎪',
      available: true
    },
    {
      id: 5,
      name: 'Custom Duffle Bag',
      points: 1000,
      category: 'Luxury',
      icon: '🎒',
      available: true
    },
    {
      id: 6,
      name: 'Platinum Member Status',
      points: 5000,
      category: 'Tier Upgrade',
      icon: '👑',
      available: false
    }
  ];

  const currentPoints = rewards?.points || 0;
  const nextTierPoints = 1000;
  const progressPercent = (currentPoints / nextTierPoints) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent">
          Vault Rewards
        </h2>
        <p className="text-muted-foreground text-lg">
          Earn points and unlock exclusive perks
        </p>
      </div>

      {/* Points Overview */}
      <Card className="luxury-card border-luxury-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-luxury-gold" />
            Your Rewards Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-luxury-gold">
              {currentPoints.toLocaleString()} Points
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to next tier</span>
                <span>{currentPoints}/{nextTierPoints}</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
            <Badge variant="secondary" className="text-luxury-purple">
              {rewards?.next_tier || 'Elite'} Tier
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Ways to Earn */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle>Earn More Points</CardTitle>
          <CardDescription>Complete activities to boost your rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-luxury-purple/20">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-5 h-5 text-luxury-purple" />
                <span className="font-medium">Complete Verification</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">One-time bonus</span>
                <Badge variant="outline">+250 pts</Badge>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-luxury-purple/20">
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-5 h-5 text-luxury-purple" />
                <span className="font-medium">Monthly Spending</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Per $100 spent</span>
                <Badge variant="outline">+10 pts</Badge>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-luxury-purple/20">
              <div className="flex items-center gap-3 mb-2">
                <Crown className="w-5 h-5 text-luxury-purple" />
                <span className="font-medium">Tier Advancement</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Level up bonus</span>
                <Badge variant="outline">+500 pts</Badge>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-luxury-purple/20">
              <div className="flex items-center gap-3 mb-2">
                <Gift className="w-5 h-5 text-luxury-purple" />
                <span className="font-medium">Special Events</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Limited time</span>
                <Badge variant="outline">+100 pts</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Redeemable Items */}
      <Card className="luxury-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Rewards Catalog</CardTitle>
              <CardDescription>Redeem your points for exclusive items</CardDescription>
            </div>
            <ShoppingBag className="w-5 h-5 text-luxury-purple" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {redeemableItems.map((item) => (
              <Card key={item.id} className={`border ${item.available ? 'border-luxury-purple/20' : 'border-gray-300/20 opacity-60'}`}>
                <CardContent className="p-4">
                  <div className="text-center space-y-3">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <Badge variant="outline" className="mt-1 text-xs">{item.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-luxury-gold font-bold">{item.points} pts</span>
                      <Button 
                        size="sm" 
                        disabled={!item.available || currentPoints < item.points}
                        className="luxury-button"
                      >
                        {!item.available ? 'Soon' : currentPoints >= item.points ? 'Redeem' : 'Need More'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exclusive Perks */}
      <Card className="luxury-card border-luxury-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gem className="w-5 h-5 text-luxury-gold" />
            Elite Member Perks
          </CardTitle>
          <CardDescription>Unlock as you advance through tiers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-luxury-purple/10">
              <span className="text-sm">Priority customer support</span>
              <span className="text-sm font-bold text-status-active">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100/50 dark:bg-gray-800/50">
              <span className="text-sm">Exclusive product drops</span>
              <Badge variant="outline">Elite Tier</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100/50 dark:bg-gray-800/50">
              <span className="text-sm">VIP event invitations</span>
              <Badge variant="outline">Legend Tier</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-100/50 dark:bg-gray-800/50">
              <span className="text-sm">Personal concierge service</span>
              <Badge variant="outline">Platinum Tier</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VaultRewardsTab;