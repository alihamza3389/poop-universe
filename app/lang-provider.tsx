"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "zh";

const LangContext = createContext<{
  lang: Lang;
  setLang: (v: Lang) => void;
}>({
  lang: "en",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(
    (typeof window !== "undefined" &&
      (localStorage.getItem("poop_lang") as Lang)) || "en"
  );

  function update(v: Lang) {
    setLang(v);
    if (typeof window !== "undefined") {
      localStorage.setItem("poop_lang", v);
    }
  }

  return (
    <LangContext.Provider value={{ lang, setLang: update }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
