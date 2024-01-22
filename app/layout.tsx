import "@/app/global.css";
import { getUser } from "@/libs/auth";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import type { ReactNode } from "react";

export const runtime = "edge";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: ReactNode;
}

export async function generateMetadata() {
  const cookieStore = cookies();
  const cookieCsrf = cookieStore.get("csrf");
  if (!cookieCsrf) return null;

  return {
    other: { csrf: cookieCsrf.value },
  };
}

export default async function RootLayout({ children }: Props) {
  const user = await getUser();

  return (
    <html lang="en" className={inter.className}>
      <body className="bg-black">
        <p className="text-white whitespace-pre font-mono text-sm">
          layout: {JSON.stringify(user, null, 2)}
        </p>
        {children}
      </body>
    </html>
  );
}
