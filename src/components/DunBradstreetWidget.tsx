import React, { useState, useEffect } from 'react';
import { Building2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const DunBradstreetWidget: React.FC = () => {
  const [status, setStatus] = useState<'pending' | 'approved' | 'active'>('pending');

  useEffect(() => {
    // Simulate status progression for demo
    const timer = setTimeout(() => {
      if (status === 'pending') {
        setStatus('approved');
      } else if (status === 'approved') {
        setStatus('active');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [status]);

  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          color: 'text-orange-400',
          bgColor: 'bg-orange-400/10',
          borderColor: 'border-orange-400/20',
          text: 'Pending Approval',
          description: 'Your tradeline application is under review'
        };
      case 'approved':
        return {
          icon: CheckCircle,
          color: 'text-blue-400',
          bgColor: 'bg-blue-400/10',
          borderColor: 'border-blue-400/20',
          text: 'Approved',
          description: 'Tradeline approved, activating reporting'
        };
      case 'active':
        return {
          icon: CheckCircle,
          color: 'text-green-400',
          bgColor: 'bg-green-400/10',
          borderColor: 'border-green-400/20',
          text: 'Active',
          description: 'Tradeline active, reporting to bureaus'
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white border-blue-200 hover:shadow-md luxury-transition rounded-2xl shadow-sm hover-card">
      <div className="p-6 space-y-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-dark-grey">Dun & Bradstreet</h3>
              <p className="text-sm text-muted-foreground">Tradeline Reporting</p>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <div className="text-xs font-bold text-blue-600 bg-white px-2 py-1 rounded border border-blue-200">
              D&B
            </div>
          </div>
        </div>

        <div className={`flex items-center gap-3 p-4 rounded-lg ${config.bgColor} border ${config.borderColor}`}>
          <StatusIcon className={`w-5 h-5 ${config.color}`} />
          <div className="flex-1">
            <div className={`font-medium ${config.color}`}>{config.text}</div>
            <div className="text-sm text-muted-foreground mt-1">{config.description}</div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Credit Limit</span>
            <span className="font-medium text-dark-grey">$25,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Account Age</span>
            <span className="font-medium text-dark-grey">7 Years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Utilization</span>
            <span className="font-medium text-green-600">2%</span>
          </div>
        </div>

        {status === 'active' && (
          <div className="pt-4 border-t border-border/50">
            <div className="text-xs text-muted-foreground text-center">
              Next report: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DunBradstreetWidget;