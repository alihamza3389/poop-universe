"use client";

import { useLang } from "@/app/lang-provider";

type Meme = {
  emoji: string;
  cn: string;
  en: string;
};

export default function MemesPage() {
  const { lang } = useLang();

  const text = {
    cn: {
      title: "便便表情包",
      subtitle: "快乐、健康、幽默的便便文化 💩",
    },
    en: {
      title: "Poop Memes",
      subtitle: "Wholesome poop-culture humor 💩",
    },
  };

  // 💩 Meme set (static MVP)
  const memes: Meme[] = [
    {
      emoji: "🧘‍♂️",
      cn: "心静如便 — 顺其自然",
      en: "Calm like poop — trust the process",
    },
    {
      emoji: "⚡",
      cn: "传奇便便 — 宇宙能量已充满",
      en: "Legendary poop — cosmic energy charged",
    },
    {
      emoji: "💧",
      cn: "多喝水 — 便便更快乐",
      en: "Drink water — happier poops ahead",
    },
    {
      emoji: "🏆",
      cn: "坚持签到 — 你是便便冠军",
      en: "Poop streak champion — keep going",
    },
    {
      emoji: "😤",
      cn: "今天便便有点难 — 但你赢了",
      en: "Tough poop today — but you won",
    },
    {
      emoji: "✨",
      cn: "好便便，好运降临",
      en: "Good poop, good luck incoming",
    },
  ];

  const t = text[lang];

  return (
    <main className="min-h-screen flex justify-center pt-16 px-4 text-center">
      <div className="max-w-md w-full">
        <h1 className="text-lg font-bold mb-2">{t.title}</h1>
        <p className="text-neutral-400 mb-4">{t.subtitle}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {memes.map((m, i) => (
            <div
              key={i}
              className="bg-neutral-800 rounded-2xl p-4 shadow-lg border border-neutral-700"
            >
              <div className="text-4xl mb-2">{m.emoji}</div>
              <p className="text-sm">
                {lang === "cn" ? m.cn : m.en}
              </p>
            </div>
          ))}
        </div>

        <p className="text-neutral-500 text-xs mt-5">
          More memes coming soon…
        </p>
      </div>
    </main>
  );
}
