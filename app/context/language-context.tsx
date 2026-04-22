"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";

export type Lang = "en" | "he" | "ar";

const LANG_EVENT = "bhip-lang-updated";
const DEFAULT_LANG: Lang = "en";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LANG_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LANG_EVENT, callback);
  };
}

function getLang(): Lang {
  try {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "he" || saved === "ar") {
      return saved;
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

function getServerSnapshot(): Lang {
  return DEFAULT_LANG;
}

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({
  lang: DEFAULT_LANG,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getLang, getServerSnapshot);

  const setLang = useCallback((newLang: Lang) => {
    try {
      localStorage.setItem("lang", newLang);
      window.dispatchEvent(new Event(LANG_EVENT));
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
