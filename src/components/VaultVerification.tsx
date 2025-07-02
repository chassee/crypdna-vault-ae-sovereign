
import React, { useState } from 'react';
import { Upload, FileText, Home, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const VaultVerification = () => {
  const [kycStatus, setKycStatus] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const UploadBox = ({ title, icon: Icon, required = true }: { title: string; icon: any; required?: boolean }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
      <Icon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
      <p className="text-sm font-medium text-gray-700 mb-1">{title}</p>
      {!required && <p className="text-xs text-gray-500">(Optional)</p>}
      <div className="mt-3">
        <button className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-md hover:bg-purple-200 transition-colors">
          Upload
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">🔐 Vault Verification</h3>
        <Badge className={getStatusColor(kycStatus)}>
          {kycStatus}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UploadBox title="Photo ID (Front)" icon={FileText} />
        <UploadBox title="Utility Bill" icon={Home} />
        <UploadBox title="Business Documents" icon={Building} required={false} />
      </div>
    </div>
  );
};

export default VaultVerification;
