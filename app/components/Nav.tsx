"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/app/lang-provider";

export default function Nav() {
  const path = usePathname();
  const { lang } = useLang();

  const text = {
    cn: { checkin: "签到", history: "记录", memes: "表情", about: "关于" },
    en: { checkin: "Check-in", history: "History", memes: "Memes", about: "About" },
  };

  const t = text[lang];

  const Tab = (href: string, label: string, emoji: string) => (
    <Link
      href={href}
      className={
        "flex flex-col items-center px-3 py-2 rounded-xl " +
        (path === href ? "bg-neutral-700 text-white" : "text-neutral-400")
      }
    >
      <span className="text-xl">{emoji}</span>
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center">
      <div className="bg-neutral-800 border border-neutral-700 rounded-2xl px-4 py-2 flex gap-3">
        {Tab("/", t.checkin, "💩")}
        {Tab("/history", t.history, "📜")}
        {Tab("/memes", t.memes, "🖼️")}
        {Tab("/about", t.about, "⭐")}
      </div>
    </div>
  );
}
