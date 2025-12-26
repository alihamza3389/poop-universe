"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { getUserId } from "@/lib/user";
import { useLang } from "@/app/lang-provider";

export default function Home() {
  const { lang } = useLang();
  const t = (en: string, zh: string) => (lang === "zh" ? zh : en);

  const [mood, setMood] = useState("");

  const moodOptions = [
    { key: "good", label: t("good", "好") },
    { key: "ok", label: t("ok", "一般") },
    { key: "struggle", label: t("struggle", "艰难") },
    { key: "legend", label: t("legend", "传奇") },
  ];

  const submit = async () => {
    if (!mood) return;

    const userId = await getUserId();

    await supabase.from("checkins").insert({
      user_id: userId,
      mood,
    });

    alert(t("Poop logged successfully!", "便便记录成功！"));
    setMood("");
  };

  return (
    <main className="min-h-screen flex flex-col items-center pt-16 px-4 text-center">
      <h1 className="text-xl font-bold">
        {t("Daily Poop Check-in 💩", "每日便便打卡 💩")}
      </h1>

      <p className="text-neutral-400 mb-6">
        {t("Log your poop and grow your streak 🚀", "记录便便，解锁连续成就 🚀")}
      </p>

      <div className="bg-neutral-900 px-4 py-4 rounded-2xl w-full max-w-md">
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full bg-neutral-800 rounded-xl px-3 py-2"
        >
          <option value="">
            {t("Select poop status", "选择便便状态")}
          </option>

          {moodOptions.map((m) => (
            <option key={m.key} value={m.key}>
              {m.label}
            </option>
          ))}
        </select>

        <button
          onClick={submit}
          className="w-full bg-amber-500 hover:bg-amber-400 mt-3 py-2 rounded-xl font-bold"
        >
          {t("Submit", "提交")}
        </button>
      </div>

      <a href="/leaderboard" className="mt-4 underline text-amber-300">
        {t("View Leaderboard 🏆", "查看排行榜 🏆")}
      </a>
    </main>
  );
}
