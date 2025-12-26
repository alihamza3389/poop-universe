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
    if (!userId) return;

    await supabase.from("checkins").insert({
      user_id: userId,
      status,
    });

    await incrementStreak(userId);
    alert("Poop logged 💩 — streak up!");
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center pt-10">
      <h1 className="text-2xl font-bold mb-4">Daily Poop Check-in 💩</h1>

      <select
        className="bg-neutral-800 px-4 py-2 rounded-xl mb-4"
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Select status</option>
        <option value="good">Good</option>
        <option value="ok">OK</option>
        <option value="struggle">Struggle</option>
        <option value="legend">Legend</option>
      </select>

      <button
        onClick={checkIn}
        className="bg-amber-500 px-6 py-2 rounded-xl text-black font-bold"
      >
        Submit
      </button>

      <div className="mt-10">
        <Link href="/leaderboard" className="underline">
          View Leaderboard
        </Link>
      </div>
    </div>
  );
}
