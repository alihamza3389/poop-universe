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

  async function checkIn() {
    if (!userId || !status) return;

    await supabase.from("checkins").insert({
      user_id: userId,
      status,
    });

    await incrementStreak(userId);

    alert("Poop logged 💩 — streak up!");
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center pt-10">

      <h1 className="text-2xl font-bold mb-2">
        Daily Poop Check-in 💩
      </h1>

      <p className="opacity-70 mb-6">
        Log your poop and grow your streak 🚀
      </p>

      <div className="bg-neutral-800 px-6 py-6 rounded-2xl shadow-lg w-[90%] max-w-sm flex flex-col items-center">
        
        <select
          className="bg-neutral-700 px-4 py-2 rounded-xl mb-4 w-full text-center"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select poop status</option>
          <option value="good">💚 Good poop</option>
          <option value="ok">🙂 Okay poop</option>
          <option value="struggle">😣 Struggle</option>
          <option value="legend">👑 Poop Legend</option>
        </select>

        <button
          onClick={checkIn}
          className="bg-amber-500 px-6 py-2 rounded-xl text-black font-bold w-full"
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
