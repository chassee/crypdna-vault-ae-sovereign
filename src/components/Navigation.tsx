
import React from 'react';
import { User, Vault, FileText } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50 luxury-transition">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center diamond-logo shadow-lg">
              <Vault className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent sparkle-animation">
                CrypDNA Vault
              </h1>
              <p className="text-xs text-muted-foreground">Billionaire Membership Portal</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent">
              <FileText className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-2 amex-cta text-white px-6 py-2 rounded-full font-medium">
              <User className="w-4 h-4" />
              <span className="text-sm">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
