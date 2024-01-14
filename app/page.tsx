import { getUser2 } from "@/libs/auth";

export default async function HomePage() {
  const user = await getUser2();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p className="text-white whitespace-pre font-mono text-sm">
        page: {JSON.stringify(user, null, 2)}
      </p>
      <p className="text-white whitespace-pre font-mono text-sm">
        {Date.now()}
      </p>
    </main>
  );
}
