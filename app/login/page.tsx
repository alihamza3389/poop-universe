"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const supabase = supabaseBrowser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (!error) setSent(true);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-xl font-bold mb-4">Login / Sign Up</h1>

      {!sent ? (
        <>
          <input
            className="px-3 py-2 rounded bg-neutral-800 mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <button onClick={signIn} className="bg-amber-500 px-4 py-2 rounded">
            Send Magic Login Link
          </button>
        </>
      ) : (
        <p>Check your email for the login link ✉️</p>
      )}

      <button className="mt-4 underline" onClick={() => router.push("/")}>
        Back
      </button>
    </main>
  );
}
