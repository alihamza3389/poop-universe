"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getUserId } from "@/lib/user";
import { useLang } from "@/app/lang-provider";

type Row = {
  mood: string;
  created_at: string;
};

export default function HistoryPage() {
  const { lang } = useLang();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const text = {
    cn: {
      title: "便便记录",
      empty: "暂无记录… 去签到吧 💩",
    },
    en: {
      title: "Poop History",
      empty: "No check-ins yet… go poop 💩",
    },
  };

  // 💩 Unified mood translations (DB stays English)
  const moodText = {
    good: {
      cn: "好便便 💪",
      en: "Good poop 💪",
    },
    ok: {
      cn: "还可以 🙂",
      en: "Okay poop 🙂",
    },
    struggle: {
      cn: "有点难 💛",
      en: "Tough poop 💛",
    },
    legend: {
      cn: "传奇便便 ⚡",
      en: "Legendary poop ⚡",
    },
  };

  const t = text[lang];

  useEffect(() => {
    async function load() {
      const userId = await getUserId();
      const { data } = await supabase
        .from("checkins")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      setRows(data || []);
      setLoading(false);
    }

    load();
  }, []);

  return (
    <main className="min-h-screen flex justify-center pt-16 px-4 text-center">
      <div className="max-w-md w-full">
        <h1 className="text-lg font-bold mb-3">{t.title}</h1>

        {loading && <p>…</p>}

        {!loading && rows.length === 0 && (
          <p className="text-neutral-400">{t.empty}</p>
        )}

        <div className="space-y-2 mt-2">
          {rows.map((r, i) => {
            const mood = moodText[r.mood as keyof typeof moodText];

            return (
              <div
                key={i}
                className="bg-neutral-800 rounded-xl px-3 py-2 flex justify-between"
              >
                <span>{mood?.[lang] ?? r.mood}</span>

                <span className="text-neutral-400 text-xs">
                  {new Date(r.created_at).toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
