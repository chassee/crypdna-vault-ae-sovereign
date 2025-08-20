import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthed(!!session);
      setLoading(false);

      // keep listening for changes
      supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthed(!!session);
      });
    };

    checkSession();
  }, []);

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-white">Loading...</div>;
  }

  if (!isAuthed) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
