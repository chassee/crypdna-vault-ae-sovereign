import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Waves, Lock, Unlock, Bell, Activity } from 'lucide-react';

const NeuroDropTab = () => {
  const [neuroSessions, setNeuroSessions] = useState<any[]>([]);
  const [waitlistStatus, setWaitlistStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNeuroSessions();
  }, []);

  const fetchNeuroSessions = async () => {
    // Using mock data for now
    setLoading(false);
  };

  const joinWaitlist = () => {
    setWaitlistStatus(true);
    // In a real app, this would make an API call
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent">
          NeuroDrop Technology
        </h2>
        <p className="text-muted-foreground text-lg">
          Unlock exclusive features through brainwave authentication
        </p>
      </div>

      {/* Technology Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="luxury-card border-luxury-purple/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Waves className="w-5 h-5 text-luxury-purple" />
              Brainwave Unlock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Use your unique brainwave patterns to unlock premium vault features and exclusive drops.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <Activity className="w-3 h-3 text-green-500" />
                <span>Alpha Wave Detection</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Activity className="w-3 h-3 text-blue-500" />
                <span>Beta Wave Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Activity className="w-3 h-3 text-purple-500" />
                <span>Gamma State Recognition</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-card border-luxury-gold/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-luxury-gold" />
              Neuro Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Real-time analysis of your cognitive state for optimal financial decisions.
            </p>
            <Badge variant="secondary" className="mb-2">Research Phase</Badge>
            <p className="text-xs text-muted-foreground">
              Partnering with leading neuroscience institutions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Session History */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle>Neuro Sessions</CardTitle>
          <CardDescription>Your brainwave unlock history</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="luxury-spinner mx-auto mb-4" />
              <p className="text-muted-foreground">Loading session data...</p>
            </div>
          ) : neuroSessions.length > 0 ? (
            <div className="space-y-3">
              {neuroSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 rounded-lg border border-luxury-purple/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-luxury-purple/20 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-luxury-purple" />
                    </div>
                    <div>
                      <p className="font-medium">EEG Score: {session.eeg_score}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(session.session_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {session.unlocked_features?.length || 0} Features Unlocked
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Sessions Yet</h3>
              <p className="text-muted-foreground mb-4">
                NeuroDrop technology is currently in development
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Waitlist */}
      <Card className="luxury-card border-luxury-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-luxury-gold" />
            Early Access Waitlist
          </CardTitle>
          <CardDescription>
            Be among the first to experience NeuroDrop technology
          </CardDescription>
        </CardHeader>
        <CardContent>
          {waitlistStatus ? (
            <div className="text-center py-6">
              <Unlock className="w-12 h-12 mx-auto mb-3 text-green-500" />
              <h3 className="text-lg font-semibold text-green-500 mb-2">You're on the list!</h3>
              <p className="text-muted-foreground">
                We'll notify you when NeuroDrop beta testing begins
              </p>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">
                Get exclusive early access to brainwave-powered vault features
              </p>
              <Button onClick={joinWaitlist} className="luxury-button">
                <Bell className="w-4 h-4 mr-2" />
                Join Waitlist
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Technology Preview */}
      <Card className="luxury-card future-tech-glow">
        <CardHeader>
          <CardTitle className="text-luxury-purple">Neural Interface Preview</CardTitle>
          <CardDescription>Experience the future of biometric security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative h-32 bg-black rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Waves className="w-12 h-12 text-white animate-bounce" />
            </div>
            <div className="absolute bottom-2 left-2 text-xs text-white/70">
              EEG Simulation • Alpha: 8-12 Hz
            </div>
          </div>
          <div className="text-center">
            <Badge variant="secondary">Demo Mode</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NeuroDropTab;