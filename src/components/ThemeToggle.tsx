import React from 'react';
import { Moon } from 'lucide-react';
import { useTheme } from './LuxuryThemeProvider';
import { Button } from './ui/button';

const ThemeToggle: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900/50 border border-gray-700">
      <Moon className="w-4 h-4 text-purple-400" />
      <span className="text-xs font-medium text-gray-300">Dark Mode</span>
    </div>
  );
};

export default ThemeToggle;