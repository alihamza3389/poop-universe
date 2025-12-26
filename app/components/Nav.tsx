"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const path = usePathname();

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
      <div className="bg-neutral-800/80 backdrop-blur px-6 py-3 rounded-2xl flex gap-6">
        {item("/", "💩", "Check-in")}
        {item("/history", "📜", "History")}
        {item("/memes", "🖼️", "Memes")}
        {item("/about", "⭐", "About")}
        {item("/leaderboard", "🏆", "Rank")}
      </div>
    </div>
  );
}
