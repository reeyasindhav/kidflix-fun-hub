import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Account = {
  name: string;
  email: string;
  household: string;
  activeKid: string;
};

type AuthValue = {
  account: Account | null;
  ready: boolean;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  setActiveKid: (id: string) => void;
};

const STORAGE_KEY = "kidflix.account";

const AuthContext = createContext<AuthValue | null>(null);

/** Mock, front-end only session used for the design prototype. */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setAccount(JSON.parse(raw) as Account);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: Account | null) => {
    setAccount(next);
    try {
      if (next) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      account,
      ready,
      signIn: (email, name) =>
        persist({
          name: name?.trim() || email.split("@")[0].replace(/[._-]/g, " ") || "Parent",
          email,
          household: "The Ravensworth family",
          activeKid: "jamie",
        }),
      signOut: () => persist(null),
      setActiveKid: (id) => persist(account ? { ...account, activeKid: id } : account),
    }),
    [account, ready, persist],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
