"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "chronocross-user";

export type User = {
  name: string;
  email: string;
};

export const DEV_USER: User = {
  name: "Dev User",
  email: "dev@chronocross.local",
};

export const isDevLoginEnabled = process.env.NODE_ENV === "development";

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  signUp: (name: string, email: string, password: string) => void;
  signIn: (email: string, password: string) => boolean;
  devLogin: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type StoredAccount = User & { password: string };

function readAccounts(): StoredAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}-accounts`);
    return raw ? (JSON.parse(raw) as StoredAccount[]) : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(`${STORAGE_KEY}-accounts`, JSON.stringify(accounts));
}

function readSession(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function writeSession(user: User | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(readSession());
    setIsLoading(false);
  }, []);

  const signUp = useCallback(
    (name: string, email: string, password: string) => {
      const accounts = readAccounts();
      const normalizedEmail = email.trim().toLowerCase();

      if (accounts.some((account) => account.email === normalizedEmail)) {
        throw new Error("An account with this email already exists.");
      }

      const newAccount: StoredAccount = {
        name: name.trim(),
        email: normalizedEmail,
        password,
      };

      writeAccounts([...accounts, newAccount]);

      const sessionUser: User = {
        name: newAccount.name,
        email: newAccount.email,
      };
      writeSession(sessionUser);
      setUser(sessionUser);
    },
    [],
  );

  const signIn = useCallback((email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const account = readAccounts().find(
      (entry) =>
        entry.email === normalizedEmail && entry.password === password,
    );

    if (!account) return false;

    const sessionUser: User = {
      name: account.name,
      email: account.email,
    };
    writeSession(sessionUser);
    setUser(sessionUser);
    return true;
  }, []);

  const devLogin = useCallback(() => {
    if (!isDevLoginEnabled) return;
    writeSession(DEV_USER);
    setUser(DEV_USER);
  }, []);

  const signOut = useCallback(() => {
    writeSession(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, signUp, signIn, devLogin, signOut }),
    [user, isLoading, signUp, signIn, devLogin, signOut],
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
