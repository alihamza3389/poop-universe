"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getUserId, incrementStreak } from "@/lib/user";
import Link from "next/link";

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getUserId().then(setUserId);
  }, []);

  async function submitCheckIn() {
    if (!userId || !status) return;

    await supabase.from("checkins").insert({
      user_id: userId,
      status,
    });

    await incrementStreak(userId);

    alert("Poop logged 💩 — streak increased!");
  }

  const options = [
    { id: "good", emoji: "💚", label: "Good Poop" },
    { id: "ok", emoji: "🙂", label: "Okay Poop" },
    { id: "struggle", emoji: "😣", label: "Struggle Poop" },
    { id: "legend", emoji: "👑", label: "Poop Legend" },
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center pt-10">

      <h1 className="text-2xl font-bold mb-1">
        Daily Poop Check-in 💩
      </h1>

      <p className="opacity-70 mb-6">
        Choose your poop vibe for today 🚀
      </p>

      <div className="bg-neutral-800 px-6 py-6 rounded-2xl shadow-xl w-[90%] max-w-sm flex flex-col items-center">

        <div className="grid grid-cols-2 gap-3 mb-4 w-full">
          {options.map(o => (
            <button
              key={o.id}
              onClick={() => setStatus(o.id)}
              className={`flex flex-col items-center justify-center py-3 rounded-2xl border transition-all
                ${status === o.id
                  ? "bg-amber-400 text-black border-amber-500 scale-105"
                  : "bg-neutral-700 border-neutral-600"
                }`}
            >
              <span className="text-3xl">{o.emoji}</span>
              <span className="text-xs mt-1">{o.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={submitCheckIn}
          disabled={!status}
          className={`w-full px-6 py-2 rounded-xl font-bold
            ${status
              ? "bg-amber-500 text-black"
              : "bg-neutral-600 text-neutral-300"
            }`}
        >
          Submit
        </button>
      </div>

      <Link
        href="/leaderboard"
        className="mt-6 underline text-amber-300"
      >
        View Leaderboard 🏆
      </Link>
    </div>
  );
}
