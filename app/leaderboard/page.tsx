export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";
import { getUserId } from "@/lib/user";

export default async function LeaderboardPage() {
  const userId = await getUserId();

  const { data: users } = await supabase
    .from("users")
    .select("id, streak")
    .order("streak", { ascending: false })
    .limit(25);

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center pt-10">
      <h1 className="text-2xl font-bold mb-6">🏆 Poop Streak Leaderboard</h1>

      <div className="w-[90%] max-w-md space-y-2">
        {users?.map((u, i) => (
          <div
            key={u.id}
            className={`flex justify-between px-4 py-2 rounded-xl
              ${
                u.id === userId
                  ? "bg-amber-500/20 border border-amber-400"
                  : "bg-neutral-800"
              }`}
          >
            <span>#{i + 1} {u.id === userId ? "✨ You" : "User"}</span>
            <span>{u.streak ?? 0} days</span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm opacity-70">
        Keep pooping daily to climb the ranks 💩
      </p>
    </div>
  );
}
