"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  firstDiscountUsed: boolean; // האם ניצל הנחה 15% ראשונה
};

type AuthContextType = {
  user: User | null;
  signUp: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  signIn: (email: string, password: string) => { ok: boolean; error?: string };
  signOut: () => void;
  markDiscountUsed: () => void;
};

const AUTH_EVENT = "bhip-auth-updated";
const USERS_KEY = "bhip-users";
const SESSION_KEY = "bhip-session";

type StoredUser = User & { passwordHash: string };

// Simple hash – good enough for a local demo
function simpleHash(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h.toString(16);
}

function getUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Cached snapshot — must return same reference when unchanged
let cachedSessionRaw: string | null = undefined as unknown as string | null;
let cachedSession: User | null = null;

function invalidateSessionCache() {
  cachedSessionRaw = undefined as unknown as string | null;
}

function getSession(): User | null {
  try {
    const raw =
      typeof window !== "undefined"
        ? localStorage.getItem(SESSION_KEY)
        : null;
    if (raw !== cachedSessionRaw) {
      cachedSessionRaw = raw;
      cachedSession = raw ? (JSON.parse(raw) as User) : null;
    }
    return cachedSession;
  } catch {
    return null;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_EVENT, callback);
  };
}

function getServerSnapshot(): User | null {
  return null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signUp: () => ({ ok: false }),
  signIn: () => ({ ok: false }),
  signOut: () => {},
  markDiscountUsed: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useSyncExternalStore(subscribe, getSession, getServerSnapshot);

  const signUp = useCallback(
    (name: string, email: string, password: string): { ok: boolean; error?: string } => {
      const users = getUsers();
      const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        return { ok: false, error: "email_exists" };
      }
      const newUser: StoredUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash: simpleHash(password),
        firstDiscountUsed: false,
      };
      saveUsers([...users, newUser]);

      // Auto sign-in after signup
      const session: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        firstDiscountUsed: false,
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      invalidateSessionCache();
      window.dispatchEvent(new Event(AUTH_EVENT));
      return { ok: true };
    },
    []
  );

  const signIn = useCallback(
    (email: string, password: string): { ok: boolean; error?: string } => {
      const users = getUsers();
      const found = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase().trim() &&
          u.passwordHash === simpleHash(password)
      );
      if (!found) {
        return { ok: false, error: "invalid_credentials" };
      }
      const session: User = {
        id: found.id,
        name: found.name,
        email: found.email,
        firstDiscountUsed: found.firstDiscountUsed,
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      invalidateSessionCache();
      window.dispatchEvent(new Event(AUTH_EVENT));
      return { ok: true };
    },
    []
  );

  const signOut = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    invalidateSessionCache();
    window.dispatchEvent(new Event(AUTH_EVENT));
  }, []);

  const markDiscountUsed = useCallback(() => {
    const session = getSession();
    if (!session) return;

    // Update stored user
    const users = getUsers();
    const idx = users.findIndex((u) => u.id === session.id);
    if (idx !== -1) {
      users[idx].firstDiscountUsed = true;
      saveUsers(users);
    }

    // Update session
    const updated: User = { ...session, firstDiscountUsed: true };
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    invalidateSessionCache();
    window.dispatchEvent(new Event(AUTH_EVENT));
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, markDiscountUsed }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
