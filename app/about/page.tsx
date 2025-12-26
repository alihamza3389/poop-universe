"use client";

import { useLang } from "@/app/lang-provider";

export default function AboutPage() {
  const { lang } = useLang();
  const t = (en: string, zh: string) => (lang === "zh" ? zh : en);

  return (
    <main className="min-h-screen flex justify-center pt-16 px-4 text-center">
      <div className="max-w-md w-full">
        <h1 className="text-lg font-bold mb-3">
          {t("About Good Poop", "关于好便便")}
        </h1>

        <p className="text-neutral-400">
          {t(
            "A wholesome poop-culture community — humor, health, and good vibes.",
            "一个温暖有爱的便便文化社区 —— 分享幽默、健康与好心情。"
          )}
        </p>
      </div>
    </main>
  );
}
