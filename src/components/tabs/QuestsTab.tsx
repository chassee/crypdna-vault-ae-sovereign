import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Trophy, Zap, Users, Star, CheckCircle } from 'lucide-react';

const QuestsTab = () => {
  const [quests, setQuests] = useState<any[]>([]);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuests();
  }, []);

  const fetchQuests = async () => {
    // Using mock data for now
    setLoading(false);
  };

  const completeQuest = (questId: string) => {
    setCompletedQuests([...completedQuests, questId]);
  };

  const dailyQuests = [
    {
      id: 'daily-1',
      title: 'Check Your Balance',
      description: 'View your vault balance and recent activity',
      points: 10,
      category: 'Daily',
      progress: 100,
      completed: completedQuests.includes('daily-1')
    },
    {
      id: 'daily-2',
      title: 'Review Credit Activity',
      description: 'Check your latest credit transactions',
      points: 15,
      category: 'Daily',
      progress: 60,
      completed: false
    },
    {
      id: 'daily-3',
      title: 'Update Profile',
      description: 'Keep your vault profile information current',
      points: 20,
      category: 'Daily',
      progress: 0,
      completed: false
    }
  ];

  const weeklyQuests = [
    {
      id: 'weekly-1',
      title: 'Complete Verification',
      description: 'Upload all required verification documents',
      points: 200,
      category: 'Weekly',
      progress: 75,
      completed: false
    },
    {
      id: 'weekly-2',
      title: 'Invite Friends',
      description: 'Share CrypDNA Vault with 3 friends',
      points: 150,
      category: 'Weekly',
      progress: 33,
      completed: false
    },
    {
      id: 'weekly-3',
      title: 'Explore Products',
      description: 'Browse and favorite 5 vault products',
      points: 100,
      category: 'Weekly',
      progress: 80,
      completed: false
    }
  ];

  const challengeQuests = [
    {
      id: 'challenge-1',
      title: 'Credit Score Booster',
      description: 'Maintain 750+ CrypDNA score for 30 days',
      points: 500,
      category: 'Challenge',
      progress: 45,
      completed: false,
      timeLeft: '23 days'
    },
    {
      id: 'challenge-2',
      title: 'Elite Spender',
      description: 'Make $5,000 in vault purchases this month',
      points: 750,
      category: 'Challenge',
      progress: 20,
      completed: false,
      timeLeft: '12 days'
    },
    {
      id: 'challenge-3',
      title: 'Community Leader',
      description: 'Help 10 new members through onboarding',
      points: 1000,
      category: 'Challenge',
      progress: 70,
      completed: false,
      timeLeft: '8 days'
    }
  ];

  const allQuests = [...dailyQuests, ...weeklyQuests, ...challengeQuests];
  const totalPoints = completedQuests.length * 50; // Simplified calculation

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent">
          Vault Quests
        </h2>
        <p className="text-muted-foreground text-lg">
          Gamified credit building and community challenges
        </p>
      </div>

      {/* Quest Progress Overview */}
      <Card className="luxury-card border-luxury-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-luxury-gold" />
            Your Quest Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-luxury-gold mb-2">{totalPoints}</div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-luxury-purple mb-2">{completedQuests.length}</div>
              <div className="text-sm text-muted-foreground">Quests Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">85%</div>
              <div className="text-sm text-muted-foreground">Weekly Goal</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Quests */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-luxury-purple" />
            Daily Quests
          </CardTitle>
          <CardDescription>Complete daily activities to earn rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dailyQuests.map((quest) => (
              <Card key={quest.id} className="border-luxury-purple/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        quest.completed ? 'bg-green-500' : 'bg-luxury-purple/20'
                      }`}>
                        {quest.completed ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <Target className="w-5 h-5 text-luxury-purple" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{quest.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{quest.description}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{quest.progress}%</span>
                          </div>
                          <Progress value={quest.progress} className="h-1" />
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <Badge variant="outline" className="mb-2">+{quest.points} pts</Badge>
                      <Button 
                        size="sm" 
                        disabled={quest.completed || quest.progress < 100}
                        onClick={() => completeQuest(quest.id)}
                        className="luxury-button block"
                      >
                        {quest.completed ? 'Completed' : quest.progress >= 100 ? 'Claim' : 'In Progress'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Quests */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-luxury-gold" />
            Weekly Challenges
          </CardTitle>
          <CardDescription>Bigger rewards for weekly accomplishments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyQuests.map((quest) => (
              <Card key={quest.id} className="border-luxury-gold/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-luxury-gold/20 flex items-center justify-center">
                        <Star className="w-5 h-5 text-luxury-gold" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{quest.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{quest.description}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{quest.progress}%</span>
                          </div>
                          <Progress value={quest.progress} className="h-1" />
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <Badge variant="outline" className="mb-2">+{quest.points} pts</Badge>
                      <Button size="sm" className="luxury-button block">
                        {quest.progress >= 100 ? 'Claim' : 'Continue'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Challenge Quests */}
      <Card className="luxury-card border-luxury-purple/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-luxury-purple" />
            Community Challenges
          </CardTitle>
          <CardDescription>Limited-time quests with premium rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {challengeQuests.map((quest) => (
              <Card key={quest.id} className="border-luxury-purple/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-luxury-purple to-luxury-gold flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{quest.title}</h3>
                          <Badge variant="destructive" className="text-xs">{quest.timeLeft}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{quest.description}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{quest.progress}%</span>
                          </div>
                          <Progress value={quest.progress} className="h-1" />
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <Badge variant="outline" className="mb-2 bg-luxury-gold/10">+{quest.points} pts</Badge>
                      <Button size="sm" className="luxury-button block">
                        {quest.progress >= 100 ? 'Claim' : 'Join'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestsTab;