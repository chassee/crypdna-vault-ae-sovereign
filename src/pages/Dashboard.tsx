// src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

import LoadingScreen from "@/components/LoadingScreen";
import VaultDashboard from "@/pages/VaultDashboard"; // <- this is the real vault UI

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // live listener (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, sess) => {
        setSession(sess ?? null);
        setUser(sess?.user ?? null);
        if (!sess?.user) navigate("/auth");
        setLoading(false);
      }
    );

    // initial session check
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      if (!data.session?.user) navigate("/auth");
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out" });
    navigate("/auth");
  };

  if (loading) return <LoadingScreen />;
  if (!user || !session) return null; // will redirect to /auth

  // ---- REAL VAULT RENDER ----
  return (
    <div className="relative">
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

      <VaultDashboard />
    </div>
  );
};

export default DashboardPage;
