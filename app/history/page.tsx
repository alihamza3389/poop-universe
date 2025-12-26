"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getUserId } from "@/lib/user";
import { useLang } from "@/app/lang-provider";

export default function HistoryPage() {
  const { lang } = useLang();
  const t = (en: string, zh: string) => (lang === "zh" ? zh : en);

  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const userId = await getUserId();

      const { data } = await supabase
        .from("checkins")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      setRows(data || []);
    };

    load();
  }, []);

  return (
    <main className="min-h-screen pt-16 px-4 flex flex-col items-center">
      <h1 className="text-lg font-bold mb-4">
        {t("Poop History", "便便记录")}
      </h1>

      <div className="w-full max-w-md space-y-2">
        {rows.map((r) => (
          <div
            key={r.id}
            className="bg-neutral-800 px-4 py-3 rounded-xl flex justify-between"
          >
            <span>{r.mood}</span>
            <span className="text-neutral-400">
              {new Date(r.created_at).toLocaleString()}
            </span>
          </div>
        ))}

        {rows.length === 0 && (
          <p className="text-neutral-400 text-center">
            {t("No history yet", "暂无记录")}
          </p>
        )}
      </div>
    </main>
  );
}
