"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getUserId } from "@/lib/user";
import { useLang } from "@/app/lang-provider";

export default function Home() {
  const { lang, toggleLang } = useLang();
  const [message, setMessage] = useState("");
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  const text = {
    cn: {
      title: "便便怎么样？",
      subtitle: "好心情，拉好便。",
      streak: "连续签到：",
      toggle: "Switch to English",
      moods: {
        good: "好的便便 💪",
        ok: "还可以 🙂",
        struggle: "今天有点难 💛",
        legend: "传奇便便 ⚡",
      },
      fortunes: [
        "今天的便便预示内心平静 🍃",
        "多喝水，多拉快乐便 💧",
        "你的便便正在积累宇宙能量 ✨",
        "稳重、踏实、像便便一样 🧘‍♂️",
      ],
    },
    en: {
      title: "How was your poop?",
      subtitle: "Good poop vibes only.",
      streak: "Poop streak:",
      toggle: "切换到中文",
      moods: {
        good: "Good poop 💪",
        ok: "Decent poop 🙂",
        struggle: "Tough poop — proud of you 💛",
        legend: "Legendary poop ⚡",
      },
      fortunes: [
        "Today’s poop shows inner peace 🍃",
        "Hydrate and trust the process 💧",
        "Your poop is charging cosmic energy ✨",
        "Calm and grounded like a wise poop 🧘‍♂️",
      ],
    },
  };

  const t = text[lang];

  function rand(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Load streak from DB
  useEffect(() => {
    async function load() {
      const userId = await getUserId();
      const { data } = await supabase
        .from("checkins")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (data) {
        let s = 0;
        let current = new Date();

        for (const row of data) {
          const day = new Date(row.created_at);
          const diff =
            Math.floor(
              (current.setHours(0,0,0,0) - day.setHours(0,0,0,0)) / 86400000
            );
          if (diff === 0 || diff === s) s++;
          else break;
        }

        setStreak(s);
      }

      setLoading(false);
    }
    load();
  }, []);

  async function checkIn(type: keyof typeof t.moods) {
    const userId = await getUserId();
    await supabase.from("checkins").insert({ user_id: userId, mood: type });
    setStreak(streak + 1);
    setMessage(t.moods[type] + " — " + rand(t.fortunes));
  }

  return (
    <main className="min-h-screen flex items-center justify-center text-center px-4">
      <div className="bg-neutral-800 p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="text-6xl mb-3">💩</div>

        <h1 className="text-2xl font-bold">{t.title}</h1>
        <p className="text-neutral-300 mb-4">{t.subtitle}</p>

        <div className="flex flex-wrap gap-2 justify-center mb-3">
          <button onClick={() => checkIn("good")} className="bg-neutral-700 px-3 py-2 rounded-xl">😄</button>
          <button onClick={() => checkIn("ok")} className="bg-neutral-700 px-3 py-2 rounded-xl">🙂</button>
          <button onClick={() => checkIn("struggle")} className="bg-neutral-700 px-3 py-2 rounded-xl">😤</button>
          <button onClick={() => checkIn("legend")} className="bg-neutral-700 px-3 py-2 rounded-xl">💩</button>
        </div>

        <p className="text-amber-300 mb-2">
          {t.streak} {loading ? "…" : streak}
        </p>

        <p className="min-h-[48px]">{message}</p>

        <button
          onClick={toggleLang}
          className="mt-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl"
        >
          {t.toggle}
        </button>
      </div>
    </main>
  );
}
