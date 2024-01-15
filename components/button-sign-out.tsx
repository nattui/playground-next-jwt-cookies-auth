"use client";

import { api } from "@/libs/constants";
import { useRouter } from "next/navigation";

interface Props {
  csrf: string | undefined;
}

export default function ButtonSignOut() {
  const router = useRouter();

  async function handleClick() {
    try {
      const meta = document.querySelector("meta[name='csrf']");
      const csrf = meta?.getAttribute("content") ?? "";
      const response = await fetch(api.signout, {
        headers: { "x-token-csrf": csrf },
        method: "POST",
      });
      if (!response.ok) throw new Error("Unable to sign out.");
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
      <span className="text-black font-medium">Sign out</span>
    </button>
  );
}
