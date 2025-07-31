import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Waves, Lock, Unlock, Bell, Activity, Zap, Eye } from 'lucide-react';

const NeuroTechTab = () => {
  const [neuroSessions, setNeuroSessions] = useState<any[]>([]);
  const [waitlistStatus, setWaitlistStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNeuroSessions();
  }, []);

  const fetchNeuroSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('neuro_tech')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setNeuroSessions(data || []);
    } catch (error) {
      console.error('Error fetching neuro sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinWaitlist = () => {
    setWaitlistStatus(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Billionaire-tier Header */}
      <div className="text-center space-y-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl animate-pulse" />
        <div className="relative">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-shimmer">
            🧠 NeuroTech Brainwave Sessions
          </h2>
          <p className="text-muted-foreground text-lg mt-2">
            Biometric vault access through quantum brainwave authentication
          </p>
        </div>
      </div>

      {/* Subscription Upgrade Banner */}
      <Card className="luxury-card border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-sm overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 animate-pulse" />
        <CardContent className="p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Ascend to Elite Tier</h3>
                <p className="text-blue-200 text-sm">Early access to NeuroTech & quantum brainwave features</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
              Upgrade Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Elite Technology Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="luxury-card border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Waves className="w-5 h-5 text-blue-400 group-hover:animate-pulse" />
              Quantum Brainwave Unlock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Multi-dimensional neural authentication for ultra-secure vault access and exclusive feature unlocks.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs">
                <Activity className="w-3 h-3 text-green-400" />
                <span className="flex-1">Alpha Wave Detection</span>
                <Badge variant="outline" className="border-green-400/50 text-green-400">Active</Badge>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <Activity className="w-3 h-3 text-blue-400" />
                <span className="flex-1">Beta Wave Analysis</span>
                <Badge variant="outline" className="border-blue-400/50 text-blue-400">Calibrated</Badge>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <Activity className="w-3 h-3 text-purple-400" />
                <span className="flex-1">Gamma State Recognition</span>
                <Badge variant="outline" className="border-purple-400/50 text-purple-400">Elite</Badge>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <Activity className="w-3 h-3 text-cyan-400" />
                <span className="flex-1">Theta Deep State</span>
                <Badge variant="outline" className="border-cyan-400/50 text-cyan-400">Quantum</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-card border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400 group-hover:animate-pulse" />
              Neural Vault Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Real-time cognitive state analysis for optimal high-stakes financial decisions and market timing.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span>Neural Processing:</span>
                <Badge variant="outline" className="border-cyan-400/50">Quantum Core</Badge>
              </div>
              <div className="flex justify-between text-xs">
                <span>Decision Accuracy:</span>
                <span className="text-cyan-400">99.94%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Response Time:</span>
                <span className="text-cyan-400">&lt;50ms</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Partnership:</span>
                <span className="text-cyan-400">MIT • Stanford</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Elite Session History */}
      <Card className="luxury-card bg-gradient-to-br from-gray-900/50 to-black/50 border-gray-700/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Elite Brainwave Session History
          </CardTitle>
          <CardDescription className="text-gray-400">Your neural authentication & unlock records</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-spin">
                <div className="w-full h-full rounded-full border-4 border-transparent border-t-white animate-spin" />
              </div>
              <p className="text-muted-foreground">Scanning neural patterns...</p>
            </div>
          ) : neuroSessions.length > 0 ? (
            <div className="space-y-4">
              {neuroSessions.map((session, index) => (
                <div key={session.id} className="p-6 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Brain className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white mb-1">
                          Session #{String(index + 1).padStart(3, '0')}
                        </h3>
                        <div className="space-y-1">
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-gray-400">Feature:</span>
                            <Badge variant="outline" className="border-blue-400/50">{session.feature_name || 'Neural Sync'}</Badge>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-gray-400">Status:</span>
                            <Badge variant="outline" className="border-cyan-400/50">{session.status}</Badge>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <span className="text-gray-400">Date:</span>
                            <span className="text-blue-400">{new Date(session.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyan-400 mb-1">
                        {Math.floor(Math.random() * 100) + 80}%
                      </div>
                      <p className="text-xs text-gray-400">Neural Match</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <Lock className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Coming Soon: Neural Sessions
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Quantum brainwave authentication will be available with Drop 3. Prepare for unparalleled biometric security.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-blue-400">
                <Unlock className="w-4 h-4" />
                <span>Unlock at Verified Pawprint tier</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Elite Access Waitlist */}
      <Card className="luxury-card border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-sm overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Bell className="w-6 h-6 text-cyan-400" />
            Elite Beta Access
          </CardTitle>
          <CardDescription>
            Join the quantum neural authentication early access program
          </CardDescription>
        </CardHeader>
        <CardContent className="relative">
          {waitlistStatus ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <Unlock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-400 mb-2">Neural Link Established!</h3>
              <p className="text-gray-300 mb-4">
                You're registered for quantum brainwave beta testing
              </p>
              <Badge variant="outline" className="border-green-400/50 text-green-400">
                Priority Access Granted
              </Badge>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-300 mb-6 text-lg">
                Get exclusive early access to quantum brainwave vault features and neural authentication protocols
              </p>
              <Button onClick={joinWaitlist} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 px-8 py-3">
                <Bell className="w-5 h-5 mr-2" />
                Join Elite Waitlist
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Neural Interface Live Preview */}
      <Card className="luxury-card future-tech-glow bg-gradient-to-br from-gray-900/80 to-black/80 border-cyan-400/30 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Live Neural Interface Preview
          </CardTitle>
          <CardDescription>Real-time quantum brainwave visualization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative h-40 bg-black rounded-2xl overflow-hidden border border-cyan-500/30">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 animate-pulse" />
            <div className="absolute inset-0">
              <div className="flex items-center justify-center h-full">
                <div className="relative">
                  <Waves className="w-16 h-16 text-cyan-400 animate-bounce" />
                  <div className="absolute inset-0 animate-ping">
                    <Waves className="w-16 h-16 text-cyan-400/50" />
                  </div>
                </div>
              </div>
              {/* Neural wave patterns */}
              <div className="absolute bottom-4 left-4 space-y-1">
                <div className="flex items-center gap-2 text-xs text-cyan-400">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Alpha: 10.2 Hz • Optimal</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-blue-400">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span>Beta: 18.7 Hz • High Focus</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-purple-400">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <span>Gamma: 42.3 Hz • Enhanced</span>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="border-cyan-400/50 text-cyan-400 bg-black/50">
                  Quantum Core Active
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Badge variant="secondary" className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30">
              🧠 Live Neural Demo • Quantum Processing
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NeuroTechTab;