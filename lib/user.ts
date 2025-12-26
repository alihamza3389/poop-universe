import { supabase } from "./supabase";

export async function getUserId(): Promise<string> {
  let id = localStorage.getItem("poop_user_id");

  if (!id) {
    const { data, error } = await supabase
      .from("users")
      .insert({})
      .select("id")
      .single();

    if (error) throw error;

    id = data!.id as string;
    localStorage.setItem("poop_user_id", id);
  }

  return id;
}
