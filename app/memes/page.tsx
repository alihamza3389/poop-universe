"use client";

import { useLang } from "@/app/lang-provider";

export default function MemesPage() {
  const { lang } = useLang();
  const t = (en: string, zh: string) => (lang === "zh" ? zh : en);

  const memes = [
    t("Calm like poop — trust the process 🧘‍♂️", "沉稳如便便 —— 相信过程 🧘‍♂️"),
    t("Legendary poop — cosmic energy charged ⚡", "传奇便便 —— 宇宙能量已充满 ⚡"),
    t("Drink water — happier poops ahead 💧", "多喝水 —— 更开心的便便在前方 💧"),
    t("Poop streak champion — keep going 🏆", "便便连胜冠军 —— 继续保持 🏆"),
    t("Tough poop today — but you won 😮‍💨", "今天的便便很难 —— 但你赢了 😮‍💨"),
    t("Good poop, good luck incoming ✨", "好运即将到来 —— 因为好便便 ✨"),
  ];

  return (
    <main className="min-h-screen pt-16 px-4 flex flex-col items-center text-center">
      <h1 className="text-lg font-bold mb-1">
        {t("Poop Memes", "便便表情包")}
      </h1>

      <p className="text-neutral-400 mb-4">
        {t("Wholesome poop-culture humor 💩", "治愈系便便文化幽默 💩")}
      </p>

      <div className="grid grid-cols-2 gap-3 max-w-md w-full">
        {memes.map((m, i) => (
          <div
            key={i}
            className="bg-neutral-800 px-3 py-3 rounded-2xl text-sm"
          >
            {m}
          </div>
        ))}
      </div>

      <p className="mt-4 text-neutral-500 text-xs">
        {t("More memes coming soon…", "更多便便梗图即将到来…")}
      </p>
    </main>
  );
}
