import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Brain, Plus, Trash2, AlertTriangle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface CrypbotManagementProps {
  onCrypbotAdded: () => void;
  onCrypbotDeleted: () => void;
  crypbots: any[];
}

const CrypbotManagement: React.FC<CrypbotManagementProps> = ({ 
  onCrypbotAdded, 
  onCrypbotDeleted, 
  crypbots 
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBot, setSelectedBot] = useState<any>(null);
  const [newBotName, setNewBotName] = useState('');
  const [emotionalSync, setEmotionalSync] = useState(false);
  const [deployStatus, setDeployStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddCrypbot = async () => {
    if (!newBotName.trim()) return;
    
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('crypbots')
        .insert([{
          user_id: user.id,
          bot_name: newBotName,
          tier: emotionalSync ? 'Elite' : 'Base'
        }]);

      if (error) throw error;
      
      onCrypbotAdded();
      setShowAddModal(false);
      setNewBotName('');
      setEmotionalSync(false);
      setDeployStatus(false);
    } catch (error) {
      console.error('Error adding crypbot:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCrypbot = async () => {
    if (!selectedBot) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('crypbots')
        .delete()
        .eq('id', selectedBot.id);

      if (error) throw error;
      
      onCrypbotDeleted();
      setShowDeleteModal(false);
      setSelectedBot(null);
    } catch (error) {
      console.error('Error deleting crypbot:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-6">
        <Button
          onClick={() => setShowAddModal(true)}
          className="luxury-button flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Crypb0t
        </Button>
        
        {crypbots.length > 0 && (
          <Button
            variant="destructive"
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Manage Bots
          </Button>
        )}
      </div>

      {/* Add Crypbot Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="luxury-card border-purple-500/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <Brain className="w-5 h-5 text-purple-400" />
              Deploy New Crypb0t
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="bot-name" className="text-sm font-medium text-foreground">
                Bot Name
              </Label>
              <Input
                id="bot-name"
                value={newBotName}
                onChange={(e) => setNewBotName(e.target.value)}
                placeholder="Enter your AI companion's name"
                className="bg-background/50 border-purple-500/20 focus:border-purple-400/40"
              />
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-foreground">Emotional Sync</Label>
                <p className="text-xs text-muted-foreground">Enable neural-linked emotional analysis</p>
              </div>
              <Switch 
                checked={emotionalSync} 
                onCheckedChange={setEmotionalSync}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-foreground">Auto-Deploy</Label>
                <p className="text-xs text-muted-foreground">Activate immediately upon creation</p>
              </div>
              <Switch 
                checked={deployStatus} 
                onCheckedChange={setDeployStatus}
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleAddCrypbot}
                disabled={!newBotName.trim() || loading}
                className="luxury-button flex-1"
              >
                {loading ? 'Deploying...' : 'Deploy Crypb0t'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Crypbot Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="luxury-card border-red-500/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Manage Crypb0ts
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Select a Crypb0t to decommission:
            </p>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {crypbots.map((bot) => (
                <div
                  key={bot.id}
                  onClick={() => setSelectedBot(bot)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedBot?.id === bot.id
                      ? 'border-red-400/50 bg-red-500/10'
                      : 'border-gray-600/30 bg-background/50 hover:border-red-400/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Brain className="w-4 h-4 text-purple-400" />
                      <span className="font-medium text-foreground">{bot.bot_name}</span>
                    </div>
                    <Badge variant="outline" className="border-purple-400/50">
                      {bot.tier}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleDeleteCrypbot}
                disabled={!selectedBot || loading}
                variant="destructive"
                className="flex-1"
              >
                {loading ? 'Decommissioning...' : 'Decommission'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedBot(null);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CrypbotManagement;