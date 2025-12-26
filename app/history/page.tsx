"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { getGuestEntries } from "@/lib/guest-store";

type Entry = { mood: string; created_at: string };

export default function HistoryPage() {
  const { user } = useAuth();
  const supabase = supabaseBrowser();
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    if (!user) {
      setEntries(getGuestEntries());
      return;
    }

    const load = async () => {
      const { data } = await supabase
        .from("checkins")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setEntries((data as Entry[]) || []);
    };

    load();
  }, [user]);

  return (
    <main className="min-h-screen px-4 pt-16">
      <h1 className="text-xl font-bold text-center">
        {user ? "Your Poop History 📜" : "Guest History 📜"}
      </h1>

      {entries.map((e, i) => (
        <div key={i} className="bg-neutral-800 p-3 my-2 rounded">
          {e.mood} — {new Date(e.created_at).toLocaleString()}
        </div>
      ))}

      {!entries.length && (
        <p className="text-neutral-400 text-center mt-6">
          No entries yet 💩
        </p>
      )}
    </main>
  );
}
