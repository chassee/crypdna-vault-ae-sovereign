import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, Trophy, Star, Zap, Users, TrendingUp } from 'lucide-react';

const LeaderboardTab = () => {
  const [leaderboards, setLeaderboards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);

  useEffect(() => {
    fetchLeaderboards();
  }, []);

  const fetchLeaderboards = async () => {
    // Using mock data for now
    setCurrentUserRank(Math.floor(Math.random() * 100) + 1);
    setLoading(false);
  };

  const mockLeaderboardData = [
    { rank: 1, user_id: '1', username: 'CrypLegend', crypdna_score: 850, rewards_points: 15420, tier: 'Legend' },
    { rank: 2, user_id: '2', username: 'VaultMaster', crypdna_score: 832, rewards_points: 14250, tier: 'Elite' },
    { rank: 3, user_id: '3', username: 'PawPrint', crypdna_score: 815, rewards_points: 13100, tier: 'Elite' },
    { rank: 4, user_id: '4', username: 'CryptoCanine', crypdna_score: 798, rewards_points: 12800, tier: 'Elite' },
    { rank: 5, user_id: '5', username: 'DiamondPaws', crypdna_score: 785, rewards_points: 12500, tier: 'Elite' },
    { rank: 6, user_id: '6', username: 'VaultExplorer', crypdna_score: 772, rewards_points: 11900, tier: 'Verified' },
    { rank: 7, user_id: '7', username: 'CrypChampion', crypdna_score: 758, rewards_points: 11400, tier: 'Verified' },
    { rank: 8, user_id: '8', username: 'AlphaTrader', crypdna_score: 745, rewards_points: 10800, tier: 'Verified' },
    { rank: 9, user_id: '9', username: 'LuxuryLifestyle', crypdna_score: 732, rewards_points: 10200, tier: 'Verified' },
    { rank: 10, user_id: '10', username: 'EliteMember', crypdna_score: 720, rewards_points: 9850, tier: 'Verified' }
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Trophy className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Star className="w-5 h-5 text-amber-600" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">#{rank}</span>;
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Legend': return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 'Elite': return 'bg-gradient-to-r from-purple-400 to-purple-600';
      case 'Verified': return 'bg-gradient-to-r from-blue-400 to-blue-600';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent">
          Vault Leaderboards
        </h2>
        <p className="text-muted-foreground text-lg">
          Compete with fellow vault members across different metrics
        </p>
      </div>

      {/* Current User Rank */}
      <Card className="luxury-card border-luxury-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-luxury-gold" />
            Your Current Standing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-luxury-gold mb-2">#{currentUserRank}</div>
              <div className="text-sm text-muted-foreground">Overall Rank</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-luxury-purple mb-2">745</div>
              <div className="text-sm text-muted-foreground">CrypDNA Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">8,420</div>
              <div className="text-sm text-muted-foreground">Rewards Points</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Tabs */}
      <Tabs defaultValue="overall" className="w-full">
        <TabsList className="grid w-full grid-cols-3 luxury-card border-luxury-purple/20 bg-background/50 backdrop-blur-md">
          <TabsTrigger 
            value="overall" 
            className="flex items-center gap-2 data-[state=active]:bg-luxury-purple data-[state=active]:text-white luxury-transition"
          >
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">Overall</span>
          </TabsTrigger>
          <TabsTrigger 
            value="score" 
            className="flex items-center gap-2 data-[state=active]:bg-luxury-purple data-[state=active]:text-white luxury-transition"
          >
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">CrypDNA Score</span>
          </TabsTrigger>
          <TabsTrigger 
            value="rewards" 
            className="flex items-center gap-2 data-[state=active]:bg-luxury-purple data-[state=active]:text-white luxury-transition"
          >
            <Star className="w-4 h-4" />
            <span className="hidden sm:inline">Rewards</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="overall" className="space-y-4">
            <Card className="luxury-card">
              <CardHeader>
                <CardTitle>Top Vault Members</CardTitle>
                <CardDescription>Ranked by overall performance and activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockLeaderboardData.map((member) => (
                    <div 
                      key={member.user_id} 
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        member.rank <= 3 ? 'border-luxury-gold/30 bg-luxury-gold/5' : 'border-luxury-purple/10'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10">
                          {getRankIcon(member.rank)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{member.username}</h3>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-white ${getTierColor(member.tier)}`}>
                              {member.tier}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-luxury-purple">{member.crypdna_score}</div>
                        <div className="text-sm text-muted-foreground">{member.rewards_points} pts</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="score" className="space-y-4">
            <Card className="luxury-card">
              <CardHeader>
                <CardTitle>CrypDNA Score Leaders</CardTitle>
                <CardDescription>Highest CrypDNA scores in the vault</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockLeaderboardData
                    .sort((a, b) => b.crypdna_score - a.crypdna_score)
                    .map((member, index) => (
                    <div 
                      key={member.user_id} 
                      className="flex items-center justify-between p-4 rounded-lg border border-luxury-purple/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10">
                          {getRankIcon(index + 1)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{member.username}</h3>
                          <Badge className={`text-white ${getTierColor(member.tier)}`}>
                            {member.tier}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-luxury-purple text-xl">{member.crypdna_score}</div>
                        <div className="text-sm text-muted-foreground">Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <Card className="luxury-card">
              <CardHeader>
                <CardTitle>Rewards Point Leaders</CardTitle>
                <CardDescription>Most rewards points earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockLeaderboardData
                    .sort((a, b) => b.rewards_points - a.rewards_points)
                    .map((member, index) => (
                    <div 
                      key={member.user_id} 
                      className="flex items-center justify-between p-4 rounded-lg border border-luxury-purple/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10">
                          {getRankIcon(index + 1)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{member.username}</h3>
                          <Badge className={`text-white ${getTierColor(member.tier)}`}>
                            {member.tier}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-luxury-gold text-xl">{member.rewards_points.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      {/* Competition Info */}
      <Card className="luxury-card border-luxury-purple/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-luxury-purple" />
            Weekly Competition
          </CardTitle>
          <CardDescription>
            Current competition period ends in 4 days
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-luxury-purple/10 border border-luxury-purple/20">
            <h3 className="font-semibold mb-2">This Week's Challenge: Credit Score Climbers</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Biggest CrypDNA score improvement wins exclusive rewards
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Prize Pool: 10,000 Points</Badge>
              <Badge variant="outline">247 Participants</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardTab;