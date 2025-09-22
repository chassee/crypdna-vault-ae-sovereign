import { useState } from 'react';
import { motion } from 'framer-motion';

interface LuxuryEliteCardProps {
  userName: string;
  vaultId: string;
  dnaScore: number;
  tier: string;
}

export default function LuxuryEliteCard({ userName, vaultId, dnaScore, tier }: LuxuryEliteCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 w-full max-w-md mx-auto">
      <motion.div
        className="relative w-full h-56 cursor-pointer preserve-3d"
        onClick={() => setIsFlipped(!isFlipped)}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-purple-950 rounded-2xl border border-purple-500/30 shadow-2xl">
          <div className="relative h-full p-6 flex flex-col justify-between">
            {/* DNA Score - Top Right */}
            <div className="absolute top-4 right-4 text-right">
              <div className="text-xs text-purple-300 uppercase tracking-wider">DNA Score</div>
              <div className="text-2xl font-bold text-white glow-text">{dnaScore}</div>
            </div>

            {/* CrypDNA Vault Logo */}
            <div className="flex items-start">
              <div className="text-lg font-bold text-white glow-text">
                CrypDNA
                <div className="text-sm text-purple-300">VAULT</div>
              </div>
            </div>

            {/* Card details */}
            <div className="space-y-2">
              <div className="text-xl font-semibold text-white glow-text">{userName}</div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs text-purple-300 uppercase tracking-wider">Vault ID</div>
                  <div className="text-sm font-mono text-white">{vaultId}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-purple-300 uppercase tracking-wider">Tier</div>
                  <div className="text-sm font-semibold text-gold">{tier}</div>
                </div>
              </div>
            </div>

            {/* Chip */}
            <div className="absolute top-16 left-6 w-10 h-8 bg-gradient-to-br from-gold to-yellow-600 rounded-md shadow-lg"></div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-950 rounded-2xl border border-purple-500/30 shadow-2xl">
          <div className="relative h-full p-6 flex flex-col justify-center items-center text-center">
            <div className="mb-4">
              <div className="text-2xl font-bold text-white glow-text mb-2">ELITE ACCESS</div>
              <div className="text-sm text-purple-300">Premium Financial Services</div>
            </div>
            
            <div className="space-y-2 text-sm text-white">
              <div>• Unlimited Global Transfers</div>
              <div>• Priority Customer Support</div>
              <div>• Exclusive Investment Access</div>
              <div>• Advanced DNA Analytics</div>
            </div>

            <div className="mt-6 text-xs text-purple-400">
              Member since 2024
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}