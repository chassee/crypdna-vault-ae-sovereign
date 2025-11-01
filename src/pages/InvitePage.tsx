import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/supabaseClient';
import { Button } from '@/components/ui/button';
import { Copy, Share2, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function InvitePage() {
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState<string>('');
  const [referralsCount, setReferralsCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferralData();
  }, []);

  async function fetchReferralData() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('vault_members')
        .select('referral_code, referrals_count')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching referral data:', error);
        return;
      }

      if (data) {
        setReferralCode(data.referral_code || '');
        setReferralsCount(data.referrals_count || 0);
      }
    } catch (err) {
      console.error('Exception fetching referral data:', err);
    } finally {
      setLoading(false);
    }
  }

  const referralLink = `https://vault.crypdawgs.com/#/join?r=${referralCode}`;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: 'Referral Link Copied',
        description: 'Share it with friends to earn rewards!',
      });
    } catch (err) {
      console.error('Failed to copy:', err);
      toast({
        title: 'Copy Failed',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Loading referral data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <Share2 className="w-8 h-8 text-luxury-purple" />
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-luxury-purple via-luxury-gold to-luxury-blue bg-clip-text text-transparent">
            Invite Friends
          </h1>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          Share your exclusive referral link and earn prestige rewards
        </p>
      </div>

      {/* Referral Stats Card */}
      <div className="luxury-card p-6 sm:p-8 space-y-6 border border-luxury-purple/20 bg-gradient-to-br from-luxury-purple/5 to-luxury-gold/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-luxury-gold" />
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground">
                {referralsCount}
              </div>
              <div className="text-sm text-muted-foreground">
                Members Recruited
              </div>
            </div>
          </div>
        </div>

        {/* Prestige Info */}
        <div className="p-4 rounded-lg bg-luxury-purple/10 border border-luxury-purple/30">
          <p className="text-sm text-center text-foreground/90">
            🌟 <strong>Each successful referral increases your Prestige Level.</strong>
          </p>
        </div>
      </div>

      {/* Referral Link Card */}
      <div className="luxury-card p-6 sm:p-8 space-y-4 border border-luxury-gold/20 bg-gradient-to-br from-luxury-gold/5 to-luxury-purple/5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Your Referral Link
          </label>
          <div className="flex gap-2">
            <div className="flex-1 px-4 py-3 rounded-lg bg-background/50 border border-border font-mono text-xs sm:text-sm break-all text-foreground">
              {referralLink}
            </div>
            <Button
              onClick={copyToClipboard}
              className="luxury-button flex-shrink-0"
              size="lg"
            >
              <Copy className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Copy</span>
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center">
            Share this link with potential members. When they sign up using your link, 
            you'll earn prestige XP and exclusive rewards.
          </p>
        </div>
      </div>
    </div>
  );
}
