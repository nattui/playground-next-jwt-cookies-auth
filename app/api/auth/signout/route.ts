import { cookies } from "next/headers";

export function POST() {
  const cookieStore = cookies();
  cookieStore.delete("session");
  return Response.json({ success: "Session has been deleted." });
}
