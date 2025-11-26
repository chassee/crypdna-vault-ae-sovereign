import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw, TrendingUp } from 'lucide-react';

interface PrestigePanelProps {
  user: any;
  userProfile: any;
}

const RANK_ORDER = ['Ghost', 'Initiate', 'Adept', 'Oracle', 'Architect'];

export default function PrestigePanel({ user, userProfile }: PrestigePanelProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const currentRank = userProfile?.rank || 'Ghost';
  const inviteCount = userProfile?.invite_count || 0;
  const currentIndex = RANK_ORDER.indexOf(currentRank);
  const nextRank = currentIndex < RANK_ORDER.length - 1 ? RANK_ORDER[currentIndex + 1] : null;

  // Simple progress calculation (3 invites per rank)
  const invitesForNextRank = (currentIndex + 1) * 3;
  const progress = nextRank ? Math.min((inviteCount / invitesForNextRank) * 100, 100) : 100;

  const handleRecalculate = async () => {
    if (!user) {
      toast({ title: 'Error', description: 'Please log in to recalculate rank.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('recalc_prestige');

      if (error) {
        throw error;
      }

      toast({ title: 'Rank Updated', description: 'Your prestige rank has been recalculated.' });
      window.location.reload();
    } catch (err: any) {
      console.error('Recalculate rank error:', err);
      toast({ title: 'Error', description: err.message || 'Failed to recalculate rank.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-card/90 to-muted/50 border-border backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Prestige Rank
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Your status in the ecosystem</p>
        </div>
        <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30">
          <span className="text-lg font-bold text-foreground">{currentRank}</span>
        </div>
      </div>

      {nextRank && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress to {nextRank}</span>
            <span className="text-foreground font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {invitesForNextRank - inviteCount} more invites needed
          </p>
        </div>
      )}

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          How to Rank Up
        </h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-purple-400">•</span>
            <span>Invite members to join the Vault</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400">•</span>
            <span>Upgrade your membership tier</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-400">•</span>
            <span>Time in Vault and active participation</span>
          </li>
        </ul>
      </div>

      <Button
        onClick={handleRecalculate}
        disabled={loading || !user}
        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500"
      >
        <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
        Recalculate Rank
      </Button>
    </Card>
  );
}
