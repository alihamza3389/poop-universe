import { supabase } from "./supabase";

export async function getUserId() {
  let id = localStorage.getItem("poop_user_id");

  if (!id) {
    const { data } = await supabase
      .from("users")
      .insert({})
      .select("id")
      .single();

    id = data?.id;
    localStorage.setItem("poop_user_id", id!);
  }

  return id!;
}

export async function incrementStreak(userId: string) {
  const { data } = await supabase
    .from("users")
    .select("streak")
    .eq("id", userId)
    .single();

  const newValue = (data?.streak ?? 0) + 1;

  await supabase
    .from("users")
    .update({ streak: newValue })
    .eq("id", userId);
}
