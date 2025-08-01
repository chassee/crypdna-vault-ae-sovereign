import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './LuxuryThemeProvider';
import { Button } from './ui/button';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative overflow-hidden bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/20 hover:border-purple-400/30 luxury-transition"
    >
      <div className="relative flex items-center gap-2">
        {theme === 'dark' ? (
          <>
            <Sun className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-medium text-foreground">Light</span>
          </>
        ) : (
          <>
            <Moon className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-medium text-foreground">Dark</span>
          </>
        )}
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity rounded" />
    </Button>
  );
};

export default ThemeToggle;