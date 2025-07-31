import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Bell, Calendar, Clock } from 'lucide-react';

interface Drop {
  id: string;
  title: string;
  description: string;
  drop_date: string;
  status: string;
}

const VaultDrops: React.FC = () => {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrops();
  }, []);

  const fetchDrops = async () => {
    try {
      const { data, error } = await supabase
        .from('drops' as any)
        .select('*')
        .order('drop_date', { ascending: true });

      if (error) throw error;
      setDrops((data as unknown as Drop[]) || []);
    } catch (error) {
      console.error('Error fetching drops:', error);
      toast({
        title: "Error",
        description: "Failed to load drops",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCountdown = (dropDate: string) => {
    const now = new Date();
    const drop = new Date(dropDate);
    const diff = drop.getTime() - now.getTime();

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live':
        return 'text-green-400 bg-green-400/20';
      case 'upcoming':
        return 'text-luxury-purple bg-luxury-purple/20';
      case 'ended':
        return 'text-muted-foreground bg-muted/20';
      default:
        return 'text-muted-foreground bg-muted/20';
    }
  };

  const handleNotifyMe = (dropTitle: string) => {
    // Play notification sound
    if (typeof Audio !== 'undefined') {
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBz2QzfLNeSsFJIHK8d2ORg0PVqzh7KtWFQo8lNvxuVkZCjWR1fLZfS4HKHvL8uGLRg0PUqzj6qpYFAo8ldxwuFYYCzTZ1fLZfSwGKH7L8uCLRg0PV6zh7K0');
        audio.volume = 0.2;
        audio.play().catch(() => {});
      } catch (e) {}
    }

    toast({
      title: "Notification Set!",
      description: `You'll be notified when ${dropTitle} goes live.`,
      className: "luxury-toast-success",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="luxury-spinner" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent">
          Upcoming Drops
        </h3>
        <p className="text-muted-foreground">Don't miss these exclusive releases</p>
      </div>

      <div className="space-y-6">
        {drops.map((drop) => {
          const countdown = getCountdown(drop.drop_date);
          const statusColor = getStatusColor(drop.status);
          
          return (
            <div
              key={drop.id}
              className="luxury-card group hover:scale-[1.01] luxury-transition hover:shadow-glow"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="text-xl font-semibold">{drop.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                        {drop.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{drop.description}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(drop.drop_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>

                  {drop.status.toLowerCase() === 'upcoming' && (
                    <Button
                      onClick={() => handleNotifyMe(drop.title)}
                      variant="outline"
                      size="sm"
                      className="luxury-button"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Notify Me
                    </Button>
                  )}
                </div>

                {countdown && drop.status.toLowerCase() === 'upcoming' && (
                  <div className="luxury-card bg-luxury-purple/10 border-luxury-purple/20">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-luxury-purple" />
                        <span className="text-sm font-medium text-luxury-purple">Time Remaining</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-luxury-gold">{countdown.days}</div>
                          <div className="text-xs text-muted-foreground">DAYS</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-luxury-gold">{countdown.hours}</div>
                          <div className="text-xs text-muted-foreground">HOURS</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-luxury-gold">{countdown.minutes}</div>
                          <div className="text-xs text-muted-foreground">MINUTES</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {drops.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <div className="text-6xl">🚀</div>
          <h4 className="text-xl font-semibold">No Drops Scheduled</h4>
          <p className="text-muted-foreground">New drops coming soon!</p>
        </div>
      )}
    </div>
  );
};

export default VaultDrops;