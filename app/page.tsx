"use client";

import { useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { addGuestEntry } from "@/lib/guest-store";

const moods = ["good", "ok", "struggle", "legend"];

export default function CheckInPage() {
  const { user } = useAuth();
  const supabase = supabaseBrowser();
  const [mood, setMood] = useState("");

  const handleSubmit = async () => {
    if (!mood) return alert("Select a status first");

    if (!user) {
      // Guest mode
      addGuestEntry(mood);
      alert("Saved locally — sign in to save your streak 🎉");
      setMood("");
      return;
    }

    // Logged-in mode
    const { error } = await supabase.from("checkins").insert({
      user_id: user.id,
      mood,
    });

    if (error) return alert(error.message);

    alert("Check-in saved 🚀");
    setMood("");
  };

  return (
    <main className="min-h-screen flex flex-col items-center pt-16 gap-4">
      <h1 className="text-xl font-bold">
        {user ? "Daily Poop Check-in 💩" : "Guest Check-in 💩"}
      </h1>

      {!user && (
        <p className="text-neutral-400 text-sm">
          Your streak won’t be saved — sign in to keep progress ✨
        </p>
      )}

      <select
        className="bg-neutral-800 px-4 py-2 rounded"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      >
        <option value="">Select poop status</option>
        {moods.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <button
        onClick={handleSubmit}
        className="bg-amber-500 px-6 py-2 rounded font-semibold"
      >
        Submit
      </button>
    </main>
  );
}
