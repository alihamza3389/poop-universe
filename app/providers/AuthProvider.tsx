"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

type UserType = {
  id: string;
  email: string | null;
} | null;

const AuthContext = createContext<{ user: UserType }>({ user: null });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = supabaseBrowser();
  const [user, setUser] = useState<UserType>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ? { id: data.user.id, email: data.user.email } : null);
    };

    getUser();
    const sub = supabase.auth.onAuthStateChange(() => getUser());
    return () => sub.data.subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
