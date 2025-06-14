
import React from 'react';
import { FileText, Upload, Users } from 'lucide-react';

const VaultFiles = () => {
  const activities = [
    { id: 1, type: 'Payment', description: 'Credit line increase approved', amount: '+$5,000', date: '2 days ago', status: 'approved' },
    { id: 2, type: 'Transaction', description: 'Premium rewards earned', amount: '+247 pts', date: '1 week ago', status: 'completed' },
    { id: 3, type: 'Benefit', description: 'Tradeline boost activated', amount: '+50 pts', date: '2 weeks ago', status: 'active' },
    { id: 4, type: 'Payment', description: 'Monthly statement processed', amount: '$1,240', date: '3 weeks ago', status: 'completed' },
  ];

  const benefits = [
    'Premium Credit Monitoring',
    'Elite Tradeline Access',
    'Personalized Credit Coaching',
    'Exclusive Member Rewards',
    'Priority Customer Support'
  ];

  return (
    <div className="space-y-8">
      {/* File Drop Area */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-purple-200 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Vault File Management</h2>
          <Upload className="w-6 h-6 text-purple-600" />
        </div>
        
        <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center bg-gradient-to-br from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-all duration-300 cursor-pointer">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Secure Document Upload</h3>
          <p className="text-gray-600 mb-4">Drop your financial documents here or click to browse</p>
          <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full hover:shadow-lg transition-all duration-300">
            Select Files
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Credit Activity History */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Credit Activity History</h3>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'approved' ? 'bg-green-500' :
                    activity.status === 'active' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-800">{activity.description}</p>
                    <p className="text-xs text-gray-600">{activity.type} • {activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    activity.amount.startsWith('+') ? 'text-green-600' : 'text-gray-800'
                  }`}>
                    {activity.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tradeline Benefits */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-800">Tradeline Benefits</h3>
          </div>
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-gray-800 font-medium">{benefit}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl border border-purple-200">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-bold">Current Score Impact:</span> +127 points
            </p>
            <p className="text-xs text-gray-600">
              Your tradeline benefits are actively boosting your credit profile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultFiles;
