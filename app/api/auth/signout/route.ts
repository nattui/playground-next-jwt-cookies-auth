import { verifyCsrf } from "@/libs/auth";
import { cookies } from "next/headers";

export function POST() {
  const verifyCsrfResult = verifyCsrf();
  if (verifyCsrfResult) return verifyCsrfResult;

  const cookieStore = cookies();
  cookieStore.delete("csrf");
  cookieStore.delete("session");
  return Response.json({ success: "Cookie tokens has been deleted." });
}
