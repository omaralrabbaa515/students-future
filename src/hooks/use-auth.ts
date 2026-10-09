import { useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const SUPERVISOR_EMAILS = [
  "mralrba0@gmail.com",
  "jowmahmoud6@gmail.com",
] as const;

export const EXECUTIVE_ADMIN_EMAIL = SUPERVISOR_EMAILS[0];

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const { data } = await supabase.auth.getSession();
        if (mounted) {
          setSession(data.session);
          setUser(data.session?.user ?? null);
        }
      } catch (err) {
        console.warn("[useAuth] Failed to load session:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (mounted) {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const avatarUrl =
    (user?.user_metadata?.avatar_url as string | undefined) ||
    (user?.user_metadata?.picture as string | undefined) ||
    null;

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.name as string | undefined) ||
    (user?.email ? user.email.split("@")[0] : "طالب");

  const isAdmin =
    Boolean(
      user?.email &&
        SUPERVISOR_EMAILS.some((e) => e.toLowerCase() === user.email?.toLowerCase()),
    ) || Boolean(user?.app_metadata?.role === "admin");

  const signOut = async () => {
    await supabase.auth.signOut();
    if (typeof window !== "undefined") {
      window.location.assign("/");
    }
  };

  return {
    user,
    session,
    loading,
    avatarUrl,
    displayName,
    isAdmin,
    signOut,
  };
}
