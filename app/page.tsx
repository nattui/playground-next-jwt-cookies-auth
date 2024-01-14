import ButtonSignIn from "@/components/button-sign-in";
import ButtonSignOut from "@/components/button-sign-out";
import { getUser } from "@/libs/auth";
import { cookies } from "next/headers";

export default async function HomePage() {
  const user = await getUser();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p className="text-white whitespace-pre font-mono text-sm">
        page: {JSON.stringify(user, null, 2)}
      </p>
      <p className="text-white whitespace-pre font-mono text-sm">
        {Date.now()}
      </p>

      <p className="text-white whitespace-pre font-mono text-sm mb-4">
        User is {user ? "authenticated" : "unauthenticated"}
      </p>

      {user ? (
        <ButtonSignOut csrf={cookies().get("csrf")?.value} />
      ) : (
        <ButtonSignIn />
      )}
    </main>
  );
}
