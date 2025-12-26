"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/app/lang-provider";
import { getUserId } from "@/lib/user";

export default function HistoryPage() {
  const { lang } = useLang();
  const t = (en: string, zh: string) => (lang === "zh" ? zh : en);

  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const userId = await getUserId();
      const { data } = await supabase
        .from("entries")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      setHistory(data || []);
    };

    load();
  }, []);

  return (
    <main className="min-h-screen px-4 pt-16 flex flex-col items-center">
      <h1 className="text-lg font-bold mb-3">
        {t("Poop History", "便便历史")}
      </h1>

      <div className="w-full max-w-md space-y-2">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="bg-neutral-800 px-4 py-3 rounded-xl flex justify-between"
          >
            <span>{entry.status}</span>
            <span className="text-neutral-400 text-xs">
              {new Date(entry.created_at).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
