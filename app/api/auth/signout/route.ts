import { cookies } from "next/headers";

export function POST() {
  const cookieStore = cookies();
  cookieStore.delete("csrf");
  cookieStore.delete("session");
  return Response.json({ success: "Cookie token has been deleted." });
}
