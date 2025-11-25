import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Copy, Gift, Users, TrendingUp, Sparkles } from 'lucide-react';

interface InviteRewardsProps {
  user: any;
  userProfile: any;
  isGuest?: boolean;
}

export default function InviteRewards({ user, userProfile, isGuest }: InviteRewardsProps) {
  const { toast } = useToast();
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const inviteCount = userProfile?.invite_count || userProfile?.invites_sent || 0;
  const joinedCount = userProfile?.invites_joined || Math.floor(inviteCount * 0.7);
  const upgradedCount = userProfile?.invites_upgraded || Math.floor(inviteCount * 0.3);

  useEffect(() => {
    if (userProfile?.invite_code) {
      setInviteCode(userProfile.invite_code);
      setInviteLink(`${window.location.origin}/#/auth?invite=${userProfile.invite_code}`);
    }
  }, [userProfile]);

  const handleGenerateInvite = async () => {
    if (isGuest) {
      toast({ 
        title: 'Guest Access', 
        description: 'Please create an account to generate invite links.', 
        variant: 'destructive' 
      });
      return;
    }

    if (!user) {
      toast({ title: 'Error', description: 'Please log in to generate invite codes.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/.netlify/functions/create_invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user.id })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate invite code');
      }

      if (data?.invite_code) {
        setInviteCode(data.invite_code);
        const link = `${window.location.origin}/#/auth?invite=${data.invite_code}`;
        setInviteLink(link);
        toast({ title: 'Success!', description: 'Your invite link has been generated.' });
      }
    } catch (err: any) {
      console.error('Generate invite error:', err);
      toast({ title: 'Error', description: err.message || 'Failed to generate invite code.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      toast({ title: 'Copied!', description: 'Invite link copied to clipboard.' });
    }
  };

  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-card/90 to-muted/50 border-border backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
            <Gift className="w-5 h-5 text-purple-400" />
            Invite & Rewards
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Grow your network, earn rewards</p>
        </div>
      </div>

      {!inviteCode ? (
        <Button
          onClick={handleGenerateInvite}
          disabled={loading || isGuest}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Generate Invite Link
        </Button>
      ) : (
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground mb-2">Your Invite Link</p>
            <p className="text-sm font-mono text-foreground break-all">{inviteLink}</p>
          </div>
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="w-full"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Invite Link
          </Button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
          <div className="flex justify-center mb-2">
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-foreground">{inviteCount}</p>
          <p className="text-xs text-muted-foreground mt-1">Invites Sent</p>
        </div>

        <div className="text-center p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20">
          <div className="flex justify-center mb-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-foreground">{joinedCount}</p>
          <p className="text-xs text-muted-foreground mt-1">Joined via You</p>
        </div>

        <div className="text-center p-4 rounded-lg bg-gradient-to-br from-pink-500/10 to-pink-500/5 border border-pink-500/20">
          <div className="flex justify-center mb-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
          </div>
          <p className="text-2xl font-bold text-foreground">{upgradedCount}</p>
          <p className="text-xs text-muted-foreground mt-1">Upgraded via You</p>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-pink-500/10 border border-purple-500/20">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Next Reward:</span> {3 - (inviteCount % 3)} more to reach next tier reward
        </p>
      </div>

      {isGuest && (
        <div className="text-center p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-sm text-yellow-200">
            Create an account to unlock invite features
          </p>
        </div>
      )}
    </Card>
  );
}
