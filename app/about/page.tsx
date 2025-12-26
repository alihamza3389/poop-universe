"use client";

import { useLang } from "@/app/lang-provider";

export default function AboutPage() {
  const { lang } = useLang();

  const text = {
    cn: {
      title: "关于 Good Poop",
      body:
        "一个快乐的便便文化社区 — 用幽默、健康和自嘲连接彼此。",
    },
    en: {
      title: "About Good Poop",
      body:
        "A wholesome poop-culture community — humor, health, and good vibes.",
    },
  };

  const t = (en: string, zh: string) => (lang === "zh" ? zh : en);
  
  return (
    <main className="min-h-screen flex justify-center pt-16 px-4 text-center">
      <div className="max-w-md w-full">
        <h1 className="text-lg font-bold mb-3">{t.title}</h1>
        <p className="text-neutral-400">{t.body}</p>
      </div>
    </main>
  );
}
