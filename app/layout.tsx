import "@/app/global.css";
import { getUser2 } from "@/libs/auth";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: ReactNode;
}

export default async function RootLayout({ children }: Props) {
  const user = await getUser2();

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
