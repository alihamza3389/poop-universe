"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/app/lang-provider";

export default function Nav() {
  const path = usePathname();
  const { lang, setLang } = useLang();

  const t = (en: string, zh: string) => (lang === "zh" ? zh : en);

  const item = (href: string, emoji: string, label: string) => (
    <Link
      href={href}
      className={`flex flex-col items-center px-4 ${
        path === href ? "text-amber-400" : "text-white"
      }`}
    >
      <span className="text-xl">{emoji}</span>
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center">
      <div className="bg-neutral-800/80 backdrop-blur px-6 py-3 rounded-2xl flex gap-6 items-center">
        {item("/", "💩", t("Check-in", "打卡"))}
        {item("/history", "📜", t("History", "记录"))}
        {item("/memes", "🖼️", t("Memes", "表情包"))}
        {item("/about", "⭐", t("About", "关于"))}
        {item("/leaderboard", "🏆", t("Rank", "排行榜"))}

        <button
          onClick={() => setLang(lang === "en" ? "zh" : "en")}
          className="ml-2 text-xs px-2 py-1 rounded-lg bg-neutral-700"
        >
          {lang === "en" ? "中文" : "EN"}
        </button>
      </div>
    </div>
  );
}
