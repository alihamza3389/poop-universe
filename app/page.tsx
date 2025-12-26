"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { getUserId } from "@/lib/user";
import { useLang } from "@/app/lang-provider";

export default function Home() {
  const { lang } = useLang();
  const t = (en: string, zh: string) => (lang === "zh" ? zh : en);

  const [status, setStatus] = useState("");

  // DB values stay English
  const statusValues = [
    { key: "good", label: t("good", "好") },
    { key: "ok", label: t("ok", "一般") },
    { key: "struggle", label: t("struggle", "艰难") },
    { key: "legend", label: t("legend", "传奇") },
  ];

  const submit = async () => {
    if (!status) return;

    const userId = await getUserId();
    await supabase.from("entries").insert({ user_id: userId, status });

    alert(t("Poop logged successfully!", "便便记录成功！"));
    setStatus("");
  };

  return (
    <main className="min-h-screen flex flex-col items-center pt-16 px-4 text-center">
      <h1 className="text-xl font-bold">
        {t("Daily Poop Check-in 💩", "每日便便打卡 💩")}
      </h1>

      <div className="bg-neutral-900 px-4 py-4 rounded-2xl w-full max-w-md mt-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full bg-neutral-800 rounded-xl px-3 py-2"
        >
          <option value="">
            {t("Select poop status", "选择便便状态")}
          </option>

          {statusValues.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
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
    </main>
  );
}
