
import React from 'react';
import { FileText, Upload, Users, Activity, CreditCard, Lock, Loader2 } from 'lucide-react';

const VaultFiles = () => {
  const activities = [
    { id: 1, type: 'Credit', description: 'Credit line increase approved', amount: '+$15,000', date: '2 days ago', status: 'approved' },
    { id: 2, type: 'Rewards', description: 'Premium rewards earned', amount: '+347 pts', date: '5 days ago', status: 'completed' },
    { id: 3, type: 'Tradeline', description: 'Tradeline boost activated', amount: '+75 pts', date: '1 week ago', status: 'active' },
    { id: 4, type: 'Payment', description: 'Auto-payment processed', amount: '$2,450', date: '2 weeks ago', status: 'completed' },
    { id: 5, type: 'Benefit', description: 'Vault tier upgrade qualified', amount: 'Elite Ready', date: '3 weeks ago', status: 'pending' },
  ];

  return (
    <div className="space-y-8">
      {/* Vault File Management Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-purple-200 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Vault File Management</h2>
          <div className="flex items-center space-x-2">
            <Upload className="w-6 h-6 text-purple-600" />
            <span className="text-purple-600 font-medium">Secure Upload</span>
          </div>
        </div>
        
        <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center bg-gradient-to-br from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-all duration-300 cursor-pointer">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Secure Document Upload</h3>
          <p className="text-gray-600 mb-4">Drop your credit documents, bank statements, or financial files here</p>
          <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:shadow-lg transition-all duration-300">
            Select Files
          </button>
          <p className="text-xs text-gray-500 mt-2">256-bit encryption • FDIC compliant</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Credit Activity History */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <Activity className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-800">Credit Activity History</h3>
          </div>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'approved' ? 'bg-green-500' :
                    activity.status === 'active' ? 'bg-status-active' :
                    activity.status === 'pending' ? 'bg-status-pending' : 'bg-status-warning'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-800">{activity.description}</p>
                    <p className="text-xs text-gray-600">{activity.type} • {activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    activity.amount.startsWith('+') ? 'text-green-600' : 
                    activity.amount.includes('Ready') ? 'text-orange-600' : 'text-gray-800'
                  }`}>
                    {activity.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Credit Snapshot */}
        <div className="bg-gray-100 rounded-2xl p-6 border border-gray-300 relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-gray-500" />
              <h3 className="text-xl font-bold text-gray-600">Business Credit Snapshot (Coming Soon)</h3>
            </div>
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          </div>
          
          <div className="space-y-4 text-gray-500">
            <div className="flex justify-between items-center">
              <span>DUNS Number:</span>
              <span className="font-medium">82-XXXX-9321</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>D&B PAYDEX Score:</span>
              <span className="font-medium">80 (Good)</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Number of Reporting Tradelines:</span>
              <span className="font-bold text-sm text-status-active">3 Active</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>CrypDNA Tier Impact:</span>
              <span className="font-medium">+14 Net 30 Points</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Next Tradeline Report Date:</span>
              <span className="font-medium">July 18, 2025</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-200/50 rounded-lg border border-gray-300">
            <div className="flex items-center space-x-2 mb-2">
              <Lock className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-400 font-medium">Coming Soon</p>
            </div>
            <p className="text-xs text-gray-400 italic">
              Live reporting from Crypdawgs Card + FDF system will appear here soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultFiles;
