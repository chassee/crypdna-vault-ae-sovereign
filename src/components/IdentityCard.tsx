import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, QrCode } from 'lucide-react';
import { format } from 'date-fns';

interface IdentityCardProps {
  userName: string;
  vaultId: string;
  rank: string;
  tier: string;
  joinDate?: string;
}

export default function IdentityCard({ userName, vaultId, rank, tier, joinDate }: IdentityCardProps) {
  const { toast } = useToast();

  const handleCopyVaultId = () => {
    navigator.clipboard.writeText(vaultId);
    toast({ title: 'Copied!', description: 'Vault ID copied to clipboard.' });
  };

  const formattedDate = joinDate ? format(new Date(joinDate), 'MMM dd, yyyy') : 'Unknown';

  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-card/90 to-muted/50 border-border backdrop-blur-xl">
      <div>
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          CrypDNA Card
        </h3>
        <p className="text-sm text-muted-foreground mt-1">Your digital identity</p>
      </div>

      <div className="relative p-8 rounded-2xl bg-gradient-to-br from-purple-600/20 via-cyan-600/20 to-pink-600/20 border border-purple-500/30 backdrop-blur-xl">
        <div className="absolute top-4 right-4">
          <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
            <QrCode className="w-10 h-10 text-white/70" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Vault Handle</p>
            <p className="text-2xl font-bold text-white mt-1">{userName}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border border-purple-400/40">
              <span className="text-sm font-semibold text-white">{rank}</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/30 to-pink-500/30 border border-cyan-400/40">
              <span className="text-sm font-semibold text-white">{tier}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Vault ID</p>
              <p className="text-sm font-mono text-white mt-1">{vaultId}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Joined</p>
              <p className="text-sm font-mono text-white mt-1">{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={handleCopyVaultId}
        variant="outline"
        className="w-full"
      >
        <Copy className="w-4 h-4 mr-2" />
        Copy Vault ID
      </Button>
    </Card>
  );
}
