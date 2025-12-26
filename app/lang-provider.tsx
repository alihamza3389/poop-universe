"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "cn" | "en";

type LangContextType = {
  lang: Lang;
  setLang: (v: Lang) => void;
  toggleLang: () => void;
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("cn");

  // Load stored language
  useEffect(() => {
    const saved = localStorage.getItem("poop_lang");
    if (saved === "en" || saved === "cn") setLangState(saved);
  }, []);

  function setLang(v: Lang) {
    setLangState(v);
    localStorage.setItem("poop_lang", v);
    window.dispatchEvent(new Event("poop_lang_changed"));
  }

  function toggleLang() {
    setLang(lang === "cn" ? "en" : "cn");
  }

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
