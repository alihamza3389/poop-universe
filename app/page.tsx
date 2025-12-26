"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { useAuth } from "./providers/AuthProvider";

export default function CheckInPage() {
  const supabase = supabaseBrowser();
  const router = useRouter();
  const { user } = useAuth();

  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Redirect unauthenticated users
  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <p>Redirecting to login…</p>
      </main>
    );
  }

  const handleSubmit = async () => {
    if (!status) {
      alert("Please select a poop status 💩");
      return;
    }

    setLoading(true);

    // Check if user already checked in today
    const today = new Date().toISOString().slice(0, 10);

    const { data: existing, error: existingError } = await supabase
      .from("checkins")
      .select("*")
      .eq("user_id", user.id)
      .gte("created_at", today);

    if (existingError) console.error(existingError);

    if (existing && existing.length > 0) {
      alert("You already checked in today 💩");
      setLoading(false);
      return;
    }

    // Insert new check-in
    const { error } = await supabase.from("checkins").insert({
      user_id: user.id,
      mood: status,
    });

    if (error) {
      console.error(error);
      alert("Failed to log poop 🚽");
    } else {
      alert("Poop logged successfully 💩");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center pt-16 px-4 text-white">
      <h1 className="text-xl font-bold mb-1">
        Daily Poop Check-in 💩
      </h1>

      <p className="text-neutral-400 mb-6">
        Log your poop and grow your streak 🚀
      </p>

      <div className="bg-neutral-900 border border-neutral-700 p-5 rounded-2xl w-full max-w-md">
        <select
          className="w-full px-3 py-2 rounded bg-neutral-800 mb-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select poop status</option>
          <option value="good">💪 good</option>
          <option value="ok">🙂 ok</option>
          <option value="struggle">😫 struggle</option>
          <option value="legend">🔥 legend</option>
        </select>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-amber-500 py-2 rounded font-bold disabled:bg-neutral-600"
        >
          {loading ? "Saving…" : "Submit"}
        </button>
      </div>

      <a
        href="/leaderboard"
        className="mt-5 underline text-amber-400"
      >
        View Leaderboard 🏆
      </a>
    </main>
  );
}
