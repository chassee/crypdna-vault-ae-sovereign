import React, { useEffect, useState } from "react";
import { Building2, CheckCircle, Clock } from "lucide-react";

type DnbStatus = "pending" | "approved" | "active";

const statusConfig: Record<DnbStatus, {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  border: string;
  title: string;
  description: string;
}> = {
  pending: {
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    title: "Pending Approval",
    description: "Your tradeline application is under review.",
  },
  approved: {
    icon: CheckCircle,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    title: "Approved",
    description: "Tradeline approved. Activating reporting.",
  },
  active: {
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    title: "Active",
    description: "Tradeline active and reporting to bureaus.",
  },
};

const DunBradstreetWidget: React.FC = () => {
  const [status, setStatus] = useState<DnbStatus>("pending");

  // Demo progression: pending -> approved -> active, then stop
  useEffect(() => {
    if (status === "active") return; // stop timers when done
    const timer = setTimeout(() => {
      setStatus((s) => (s === "pending" ? "approved" : "active"));
    }, 3000);
    return () => clearTimeout(timer);
  }, [status]);

  const cfg = statusConfig[status];
  const Icon = cfg.icon;

  return (
    <div className="rounded-2xl shadow-sm luxury-transition hover:shadow-md overflow-hidden
                    border border-white/10
                    bg-white/80 dark:bg-black/40
                    backdrop-blur">
      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center
                            bg-gradient-to-br from-blue-600 to-indigo-600">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                Dun &amp; Bradstreet
              </h3>
              <p className="text-sm text-muted-foreground">Tradeline Reporting</p>
            </div>
          </div>

          <div className="px-3 py-1 rounded text-sm font-bold
                          text-white bg-blue-600">D&amp;B</div>
        </div>

        {/* Status pill */}
        <div className={`flex items-center gap-3 p-4 rounded-lg border ${cfg.bg} ${cfg.border}`}>
          <Icon className={`w-5 h-5 ${cfg.color}`} />
          <div className="flex-1">
            <div className={`text-base font-bold ${cfg.color}`}>{cfg.title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{cfg.description}</div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status:</span>
            <span className="font-semibold">Pending Integration</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Tradeline Status:</span>
            <span className="font-semibold">
              {status === "active" ? "Active" : status === "approved" ? "Approved" : "Awaiting Sync"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Reporting:</span>
            <span className="font-semibold">{status === "active" ? "Enabled" : "TBD"}</span>
          </div>
        </div>

        {/* Next report hint */}
        {status === "active" && (
          <div className="pt-4 border-t border-white/10">
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
