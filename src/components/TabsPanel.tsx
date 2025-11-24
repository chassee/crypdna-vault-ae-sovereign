import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import type { User } from '@supabase/supabase-js';

interface TabsPanelProps {
  user: User | null;
  userProfile: any;
  kycData: any;
  verificationData: any;
  balances: {
    available: number;
    pending: number;
    card: number;
  };
  onSignOut: () => void;
  onRefresh: () => void;
}

export default function TabsPanel({
  user,
  userProfile,
  kycData,
  verificationData,
  balances,
  onSignOut,
  onRefresh,
}: TabsPanelProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="balance" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="balance">Balance</TabsTrigger>
          <TabsTrigger value="drops">Drops</TabsTrigger>
          <TabsTrigger value="crypbots">Crypb0ts</TabsTrigger>
          <TabsTrigger value="neuro">Neuro</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="balance">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Balance & Tradelines</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-3xl font-bold">${balances.available.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Pending Balance</p>
                <p className="text-3xl font-bold">${balances.pending.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Card Balance</p>
                <p className="text-3xl font-bold">${balances.card.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Vault ID</h3>
              <p className="text-muted-foreground">{userProfile?.vault_id || 'Loading...'}</p>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Account Status</h3>
              <p className="text-muted-foreground">{userProfile?.status || 'Active'}</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="drops">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">CrypDNA Drops</h2>
            <p className="text-muted-foreground">
              Ultra-limited CrypDNA releases coming soon. Stay tuned for exclusive bags, vinyls, and AI collectibles.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="crypbots">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Crypb0ts</h2>
            <p className="text-muted-foreground">
              Your emotional AI companions. Sync status and manage your Crypb0ts here.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="neuro">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Neuro Tech</h2>
            <p className="text-muted-foreground">
              Brain-computer interface and cognitive enhancement features coming soon.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">About CrypDNA</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to the CrypDNA Vault - your secure digital identity and credit ecosystem.
            </p>
            <div className="space-y-2">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Joined:</strong> {userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Tier:</strong> {userProfile?.tier || 'Standard'}</p>
            </div>
            <button
              onClick={onSignOut}
              className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
