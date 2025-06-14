
import React from 'react';
import { User, Vault, FileText } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-purple-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Vault className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CrypDNA Vault
              </h1>
              <p className="text-xs text-gray-500">Crypdawgs Membership Portal</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="text-gray-600 hover:text-purple-600 transition-colors">
              <FileText className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all">
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
