
import React, { useState } from 'react';
import { FileText, User, Copy, Check } from 'lucide-react';

interface CrypDNACardProps {
  fileNumber: string;
}

const CrypDNACard = ({ fileNumber }: CrypDNACardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fileNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">CrypDNA File</h3>
        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">File Number</p>
              <p className="text-lg font-mono font-bold text-purple-600">{fileNumber}</p>
            </div>
            <div className="relative">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-md transition-colors text-sm"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
            <p className="text-xs text-gray-600">Status</p>
            <p className="text-sm font-bold text-green-600">Active</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
            <p className="text-xs text-gray-600">Tier</p>
            <p className="text-sm font-bold text-purple-600">Legend</p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-purple-200">
          <div className="flex items-center space-x-3">
            <User className="w-4 h-4 text-gray-600" />
            <div>
              <p className="text-xs text-gray-600">Assigned Member</p>
              <p className="text-sm font-medium text-gray-800">Vault Legend #1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrypDNACard;
