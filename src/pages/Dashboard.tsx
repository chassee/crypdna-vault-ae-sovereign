// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

import LoadingScreen from "@/components/LoadingScreen";
import VaultDashboard from "@/pages/VaultDashboard"; // ✅ point to the real Vault page

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1) Auth change listener
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (!s?.user) navigate("/auth");
      setLoading(false);
    });

    // 2) Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/auth");
      setLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been logged out.",
      });
      navigate("/auth");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  if (loading) return <LoadingScreen />;
  if (!user || !session) return null; // will redirect to /auth

  return (
    <div className="relative">
      {/* global sign out on dashboard */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm border-purple-200 hover:bg-purple-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* 🚀 This renders the full CrypDNA Vault (bags, crypbots, D&B, debit card, etc.) */}
      <VaultDashboard />
    </div>
  );
};

export default DashboardPage;
