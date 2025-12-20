import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Shield, ArrowLeft } from 'lucide-react';
import { getSecureAccessDeniedMessage } from '@/lib/auth-security';

interface LockedVaultScreenProps {
  onReturnToAuth?: () => void;
}

/**
 * Locked-state screen for unauthorized Vault access attempts.
 * 
 * SECURITY REQUIREMENTS:
 * - Never reveals internal auth logic
 * - Never shows error stack traces
 * - Never exposes user enumeration data
 * - Uses generic, secure messaging
 */
const LockedVaultScreen: React.FC<LockedVaultScreenProps> = ({ onReturnToAuth }) => {
  const navigate = useNavigate();

  const handleReturn = () => {
    if (onReturnToAuth) {
      onReturnToAuth();
    } else {
      navigate('/auth', { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background effects - matches auth page */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_50%)]" />

      <div className="w-full max-w-md p-8 space-y-8 relative z-10 text-center">
        {/* Lock icon with warning state */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-red-600 via-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-500/40">
              <Lock className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Shield className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-3xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Access Restricted
          </h1>
          <p className="text-gray-300 text-lg font-medium">
            CrypDNA Vault
          </p>
        </div>

        {/* Security message - uses centralized secure messaging */}
        <div className="p-6 bg-red-900/30 border border-red-500/40 rounded-xl">
          <p className="text-red-200 text-sm leading-relaxed">
            {getSecureAccessDeniedMessage()}
          </p>
        </div>

        {/* Action button */}
        <button
          onClick={handleReturn}
          className="w-full py-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 text-white text-base font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Return to Authentication</span>
        </button>

        {/* Footer notice */}
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500">
            Unauthorized access attempts are logged and monitored.
          </p>
          <p className="text-xs text-gray-600">
            Contact your sponsor for membership verification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LockedVaultScreen;
