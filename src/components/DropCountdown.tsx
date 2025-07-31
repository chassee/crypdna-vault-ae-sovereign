import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Rocket } from 'lucide-react';

interface DropEvent {
  id: string;
  title: string;
  drop_date: string;
  status: string;
}

const DropCountdown = () => {
  const [drops, setDrops] = useState<DropEvent[]>([]);
  const [countdowns, setCountdowns] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Mock drop data - in real app, fetch from supabase drops table
    const mockDrops: DropEvent[] = [
      {
        id: 'drop-2',
        title: 'Drop 2: Crypb0ts Launch',
        drop_date: '2024-09-15T12:00:00Z',
        status: 'upcoming'
      },
      {
        id: 'drop-3',
        title: 'Drop 3: NeuroDrop Alpha',
        drop_date: '2024-10-01T15:00:00Z',
        status: 'upcoming'
      }
    ];
    setDrops(mockDrops);
  }, []);

  useEffect(() => {
    const updateCountdowns = () => {
      const newCountdowns: { [key: string]: string } = {};
      
      drops.forEach(drop => {
        const now = new Date().getTime();
        const dropTime = new Date(drop.drop_date).getTime();
        const difference = dropTime - now;
        
        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          
          newCountdowns[drop.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
          newCountdowns[drop.id] = 'LIVE NOW';
        }
      });
      
      setCountdowns(newCountdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, [drops]);

  if (drops.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {drops.map((drop) => (
        <Card key={drop.id} className="luxury-card border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 animate-pulse" />
          <CardContent className="p-6 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">{drop.title}</h3>
                <Badge variant="outline" className="border-purple-400/50 text-purple-400">
                  {drop.status.toUpperCase()}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">
                {new Date(drop.drop_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>

            <div className="text-center p-4 rounded-xl bg-gradient-to-r from-black/30 to-gray-900/30 border border-purple-500/20">
              <div className="text-2xl font-mono font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                {countdowns[drop.id] || 'Loading...'}
              </div>
              <p className="text-xs text-gray-400 mt-1">Until Launch</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DropCountdown;