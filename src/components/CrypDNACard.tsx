import React, { useState, useEffect } from "react";
import { FileText, User, Copy, Check } from "lucide-react";
import { getIdentityCard } from "@/lib/api/identityCard";

interface CrypDNACardProps {
  userId: string;
}

const CrypDNACard = ({ userId }: CrypDNACardProps) => {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState<any>(null);

  // ---------------------------------
  // Fetch REAL Identity Card Data
  // ---------------------------------
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getIdentityCard(userId);
        setCardData(data);
      } catch (err) {
        console.error("Identity card load error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId]);

  // ---------------------------------
  // Copy ID
  // ---------------------------------
  const handleCopy = async () => {
    if (!cardData?.vault_id) return;
    try {
      await navigator.clipboard.writeText(cardData.vault_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-300/30 shadow animate-pulse">
        <p className="text-center text-sm text-gray-300">Loading Identity Card...</p>
      </div>
    );
  }

  if (!cardData) {
    return (
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-red-300/30 shadow">
        <p className="text-center text-sm text-red-300">Failed to load identity.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">CrypDNA Identity</h3>
        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* VAULT ID */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Vault ID</p>
            <p className="text-lg font-mono font-bold text-purple-600">{cardData.vault_id}</p>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-md transition-colors text-sm"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* STATUS + TIER */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
          <p className="text-xs text-gray-600">Status</p>
          <p className="text-sm font-bold text-green-600">{cardData.status || "Active"}</p>
        </div>

        <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <p className="text-xs text-gray-600">Rank</p>
          <p className="text-sm font-bold text-purple-600">{cardData.rank}</p>
        </div>
      </div>

      {/* VAULT HANDLE */}
      <div className="p-4 border-t border-purple-200 flex items-center space-x-3">
        <User className="w-4 h-4 text-gray-600" />
        <div>
          <p className="text-xs text-gray-600">Vault Handle</p>
          <p className="text-sm font-medium text-gray-800">{cardData.vault_handle}</p>
        </div>
      </div>

      {/* JOIN DATE */}
      <div className="mt-3 pl-7 text-xs text-gray-500">
        Joined:{" "}
        <span className="font-medium text-gray-700">
          {cardData.joined_at ? new Date(cardData.joined_at).toLocaleDateString() : "Unknown"}
        </span>
      </div>
    </div>
  );
};

export default CrypDNACard;
