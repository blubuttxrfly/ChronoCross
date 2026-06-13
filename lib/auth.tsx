"use client";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type User = {
  name: string;
  email: string;
};

export const DEV_USER: User = {
  name: "Dev User",
  email: "dev@chronocross.local",
};

export const isDevLoginEnabled = process.env.NODE_ENV === "development";

function mapSupabaseUser(user: SupabaseUser): User {
  const metadataName =
    typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : "";

  return {
    name: metadataName || user.email?.split("@")[0] || "Member",
    email: user.email ?? "",
  };
}

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  signUp: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ needsEmailConfirmation: boolean }>;
  signInStart: (email: string, password: string) => Promise<void>;
  verifySignInOtp: (email: string, token: string) => Promise<void>;
  resendSignInOtp: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  devLogin: () => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = useMemo(
    () => (isSupabaseConfigured() ? createClient() : null),
    [],
  );

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    let mounted = true;

    supabase.auth.getUser().then(({ data: { user: authUser } }) => {
      if (!mounted) return;
      setUser(authUser ? mapSupabaseUser(authUser) : null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? mapSupabaseUser(session.user) : null);
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      if (!supabase) {
        throw new Error(
          "Supabase is not configured. Add your project keys to .env.local.",
        );
      }
      const normalizedEmail = email.trim().toLowerCase();
      const redirectTo = `${window.location.origin}/auth/callback?next=/dashboard`;

      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: { full_name: name.trim() },
          emailRedirectTo: redirectTo,
        },
      });

      if (error) throw error;

      return { needsEmailConfirmation: !data.session };
    },
    [supabase],
  );

  const signInStart = useCallback(
    async (email: string, password: string) => {
      if (!supabase) {
        throw new Error(
          "Supabase is not configured. Add your project keys to .env.local.",
        );
      }
      const normalizedEmail = email.trim().toLowerCase();

      const { error: passwordError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (passwordError) {
        throw passwordError;
      }

      await supabase.auth.signOut();

      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: normalizedEmail,
        options: { shouldCreateUser: false },
      });

      if (otpError) {
        throw otpError;
      }
    },
    [supabase],
  );

  const verifySignInOtp = useCallback(
    async (email: string, token: string) => {
      if (!supabase) {
        throw new Error(
          "Supabase is not configured. Add your project keys to .env.local.",
        );
      }
      const normalizedEmail = email.trim().toLowerCase();
      const code = token.trim();

      const { error } = await supabase.auth.verifyOtp({
        email: normalizedEmail,
        token: code,
        type: "email",
      });

      if (error) throw error;
    },
    [supabase],
  );

  const resendSignInOtp = useCallback(
    async (email: string) => {
      if (!supabase) {
        throw new Error(
          "Supabase is not configured. Add your project keys to .env.local.",
        );
      }
      const normalizedEmail = email.trim().toLowerCase();

      const { error } = await supabase.auth.signInWithOtp({
        email: normalizedEmail,
        options: { shouldCreateUser: false },
      });

      if (error) throw error;
    },
    [supabase],
  );

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) {
      throw new Error(
        "Supabase is not configured. Add your project keys to .env.local.",
      );
    }
    const redirectTo = `${window.location.origin}/auth/callback?next=/dashboard`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    if (error) throw error;
  }, [supabase]);

  const devLogin = useCallback(() => {
    if (!isDevLoginEnabled) return;
    document.cookie = "dev_bypass=1; path=/; max-age=86400; SameSite=Lax";
    setUser(DEV_USER);
  }, []);

  const signOut = useCallback(async () => {
    document.cookie = "dev_bypass=; path=/; max-age=0; SameSite=Lax";
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  }, [supabase]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      signUp,
      signInStart,
      verifySignInOtp,
      resendSignInOtp,
      signInWithGoogle,
      devLogin,
      signOut,
    }),
    [
      user,
      isLoading,
      signUp,
      signInStart,
      verifySignInOtp,
      resendSignInOtp,
      signInWithGoogle,
      devLogin,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
