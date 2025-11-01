import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Trophy, Zap } from 'lucide-react';

interface PrestigeData {
  prestige_level: number;
  prestige_xp: number;
}

export default function PrestigeRankDisplay() {
  const { toast } = useToast();
  const [prestigeData, setPrestigeData] = useState<PrestigeData | null>(null);
  const [loading, setLoading] = useState(true);

  const getRankInfo = (level: number) => {
    if (level >= 10) {
      return {
        name: 'ASTRAL',
        color: 'from-[#C8A2FF] to-[#6AFBFF]',
        glow: 'shadow-[0_0_30px_rgba(200,162,255,0.6)]',
        textGlow: 'drop-shadow-[0_0_8px_rgba(106,251,255,0.8)]'
      };
    } else if (level >= 7) {
      return {
        name: 'OBSIDIAN',
        color: 'from-[#1A1A1A] via-[#4A4A4A] to-[#1A1A1A]',
        glow: 'shadow-[0_0_25px_rgba(138,43,226,0.4)]',
        textGlow: 'drop-shadow-[0_0_6px_rgba(138,43,226,0.6)]'
      };
    } else if (level >= 4) {
      return {
        name: 'GOLD',
        color: 'from-[#FFCF4A] to-[#FFA500]',
        glow: 'shadow-[0_0_25px_rgba(255,207,74,0.6)]',
        textGlow: 'drop-shadow-[0_0_8px_rgba(255,207,74,0.8)]'
      };
    } else {
      return {
        name: 'SILVER',
        color: 'from-[#D7D7D7] to-[#A8A8A8]',
        glow: 'shadow-[0_0_20px_rgba(215,215,215,0.5)]',
        textGlow: 'drop-shadow-[0_0_6px_rgba(215,215,215,0.7)]'
      };
    }
  };

  const fetchPrestigeData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('vault_members')
        .select('prestige_level, prestige_xp')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      if (data) {
        setPrestigeData(data);
      }
    } catch (error) {
      console.error('Error fetching prestige data:', error);
    } finally {
      setLoading(false);
    }
  };

  const awardLoginXP = async () => {
    try {
      const { data, error } = await supabase.rpc('award_my_prestige_xp', {
        xp_amount: 5
      }) as { data: any; error: any };

      if (error) throw error;
      
      if (data && typeof data === 'object' && data.leveled_up) {
        toast({
          title: '🎉 Level Up!',
          description: `Congratulations! You've reached Level ${data.prestige_level}!`,
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Error awarding login XP:', error);
    }
  };

  useEffect(() => {
    fetchPrestigeData();
    awardLoginXP();

    // Real-time subscription for prestige updates
    const channel = supabase
      .channel('prestige-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'vault_members',
          filter: `user_id=eq.${supabase.auth.getUser().then(u => u.data.user?.id)}`
        },
        (payload) => {
          if (payload.new) {
            const newData = payload.new as PrestigeData;
            setPrestigeData(newData);
            
            // Check if level increased
            if (prestigeData && newData.prestige_level > prestigeData.prestige_level) {
              toast({
                title: '🎉 Level Up!',
                description: `Congratulations! You've reached Level ${newData.prestige_level}!`,
                duration: 5000,
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading || !prestigeData) {
    return (
      <div className="w-full h-32 luxury-card animate-pulse bg-card/50" />
    );
  }

  const rankInfo = getRankInfo(prestigeData.prestige_level);
  const xpNeeded = prestigeData.prestige_level * 100;
  const progressPercent = (prestigeData.prestige_xp / xpNeeded) * 100;
  const xpRemaining = xpNeeded - prestigeData.prestige_xp;

  return (
    <div className={`luxury-card relative overflow-hidden ${rankInfo.glow} transition-all duration-500`}>
      {/* Animated Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${rankInfo.color} opacity-10 animate-pulse`} />
      
      <div className="relative p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8" style={{ filter: rankInfo.textGlow }} />
            <div>
              <h2 
                className={`text-3xl font-black tracking-wider bg-gradient-to-r ${rankInfo.color} bg-clip-text text-transparent`}
                style={{ filter: rankInfo.textGlow }}
              >
                {rankInfo.name}
              </h2>
              <p className="text-sm text-muted-foreground font-medium">
                Level {prestigeData.prestige_level}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <Zap className="w-5 h-5 text-luxury-gold" />
              <span className="text-xl font-bold text-foreground">
                {prestigeData.prestige_xp} XP
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {xpRemaining} XP to Level {prestigeData.prestige_level + 1}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress 
            value={progressPercent} 
            className="h-3 bg-background/50"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{prestigeData.prestige_xp} / {xpNeeded} XP</span>
            <span>{progressPercent.toFixed(1)}%</span>
          </div>
        </div>

        {/* XP Info */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Login Bonus</p>
            <p className="text-sm font-bold text-luxury-gold">+5 XP</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Content View</p>
            <p className="text-sm font-bold text-luxury-purple">+2 XP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
