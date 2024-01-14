"use client";

import { api } from "@/libs/constants";
import { useRouter } from "next/navigation";

export default function ButtonSignIn() {
  const router = useRouter();

  async function handleClick() {
    try {
      const response = await fetch(api.signin, { method: "POST" });
      if (!response.ok) throw new Error("Unable to sign in.");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      className="bg-gray-100 rounded-lg px-3 py-1.5 transition-all hover:bg-gray-300 active:scale-[0.975]"
      type="button"
      onClick={handleClick}
    >
      <span className="text-black font-medium">Sign in</span>
    </button>
  );
}
