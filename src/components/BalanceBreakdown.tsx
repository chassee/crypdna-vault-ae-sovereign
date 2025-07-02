
import React from 'react';

const BalanceBreakdown = () => {
  const availableBalance = 12847.50;
  const pendingBalance = 2500.00;
  const lastTransaction = "Target • $247.89";

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-300 mt-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">💳 Balance Breakdown</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Available Balance</span>
          <span className="text-xl font-bold text-green-600">${availableBalance.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Pending Balance</span>
          <span className="text-xl font-bold text-orange-600">${pendingBalance.toLocaleString()}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Last Transaction</span>
            <span className="text-sm font-medium text-gray-800">{lastTransaction}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceBreakdown;
