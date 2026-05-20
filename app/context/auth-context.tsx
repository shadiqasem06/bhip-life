"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export type User = {
  id: string;
  name: string;
  email: string;
  firstDiscountUsed: boolean;
  isAdmin: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signUp: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => Promise<void>;
  markDiscountUsed: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signUp: async () => ({ ok: false }),
  signIn: async () => ({ ok: false }),
  signOut: async () => {},
  markDiscountUsed: async () => {},
});

async function fetchProfile(sbUser: SupabaseUser): Promise<User> {
  const { data } = await supabase
    .from("profiles")
    .select("name, first_discount_used, is_admin")
    .eq("id", sbUser.id)
    .single();
  return {
    id: sbUser.id,
    name: data?.name ?? sbUser.user_metadata?.name ?? sbUser.email ?? "",
    email: sbUser.email ?? "",
    firstDiscountUsed: data?.first_discount_used ?? false,
    isAdmin: data?.is_admin ?? false,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted) return;
      if (session?.user) {
        const profile = await fetchProfile(session.user);
        setUser(profile);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;
        if (session?.user) {
          const profile = await fetchProfile(session.user);
          setUser(profile);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = useCallback(async (
    name: string, email: string, password: string
  ): Promise<{ ok: boolean; error?: string }> => {
    const { error } = await supabase.auth.signUp({
      email: email.toLowerCase().trim(),
      password,
      options: { data: { name: name.trim() } },
    });
    if (error) {
      if (error.message.includes("already registered")) return { ok: false, error: "email_exists" };
      return { ok: false, error: error.message };
    }
    return { ok: true };
  }, []);

  const signIn = useCallback(async (
    email: string, password: string
  ): Promise<{ ok: boolean; error?: string }> => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password,
    });
    if (error) return { ok: false, error: "invalid_credentials" };
    return { ok: true };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const markDiscountUsed = useCallback(async () => {
    if (!user) return;
    await supabase
      .from("profiles")
      .update({ first_discount_used: true })
      .eq("id", user.id);
    setUser((prev) => prev ? { ...prev, firstDiscountUsed: true } : null);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, markDiscountUsed }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
