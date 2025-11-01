import React from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Brain, Waves, Rocket, Info, Share2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileFloatingNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileFloatingNav: React.FC<MobileFloatingNavProps> = ({ activeTab, onTabChange }) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const navItems = [
    { id: 'balances', icon: Wallet, label: 'Balance' },
    { id: 'drops', icon: Rocket, label: 'Drops' },
    { id: 'crypbots', icon: Brain, label: 'Crypb0ts' },
    { id: 'neurotech', icon: Waves, label: 'NeuroTech' },
    { id: 'invite', icon: Share2, label: 'Invite' },
    { id: 'about', icon: Info, label: 'About Us' }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/80 backdrop-blur-xl rounded-full border border-purple-500/30 px-2 py-2 shadow-2xl">
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={`
                  relative rounded-full w-12 h-12 p-0 transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-110' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }
                `}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-5 h-5" />
                {isActive && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <span className="text-xs font-medium text-purple-400 whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileFloatingNav;