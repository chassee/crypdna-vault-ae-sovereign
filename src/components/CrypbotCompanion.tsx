
import React from 'react';

const CrypbotCompanion = () => {
  return (
    <div className="bg-gray-100 rounded-2xl p-6 border border-gray-300 opacity-60 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 to-gray-300/50 backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-600">🤖 Crypb0t Companion</h3>
          <div className="text-2xl">🔒</div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Emotional Sync:</span>
            <span className="text-gray-500 flex items-center gap-1">🔘 Offline</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Cryplink ID:</span>
            <span className="text-gray-500 flex items-center gap-1">🔒 Not Connected</span>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400 italic">Unlock at Verified Pawprint tier</p>
        </div>
      </div>
    </div>
  );
};

export default CrypbotCompanion;
