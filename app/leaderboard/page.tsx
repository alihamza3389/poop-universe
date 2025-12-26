"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/app/lang-provider";

export default function Leaderboard() {
  const { lang } = useLang();
  const t = (en: string, zh: string) => (lang === "zh" ? zh : en);

  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("checkins")
        .select("user_id, mood");

      const counts: Record<string, number> = {};

      (data || []).forEach((r) => {
        counts[r.user_id] = (counts[r.user_id] || 0) + 1;
      });

      const sorted = Object.entries(counts)
        .map(([user_id, count]) => ({ user_id, count }))
        .sort((a, b) => b.count - a.count);

      setRows(sorted);
    };

    load();
  }, []);

  return (
    <main className="min-h-screen pt-16 px-4 flex flex-col items-center">
      <h1 className="text-lg font-bold mb-2">
        {t("Poop Leaderboard 🏆", "便便排行榜 🏆")}
      </h1>

      <p className="text-neutral-400 mb-4">
        {t("Top streak poop heroes 💪", "顶级便便勇士 💪")}
      </p>

      <div className="w-full max-w-md space-y-2">
        {rows.map((r, i) => (
          <div
            key={r.user_id}
            className="bg-neutral-800 px-4 py-3 rounded-xl flex justify-between"
          >
            <span>
              #{i + 1} — {r.user_id.slice(0, 6)}…
            </span>
            <span className="text-amber-300">{r.count}</span>
          </div>
        ))}

        {rows.length === 0 && (
          <p className="text-neutral-400 text-center">
            {t("No rankings yet", "暂无排行")}
          </p>
        )}
      </div>
    </main>
  );
}
