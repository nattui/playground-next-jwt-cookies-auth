import { verifyCsrf, verifySession } from "@/libs/auth";

export function GET() {
  const verifyCsrfResult = verifyCsrf();
  if (verifyCsrfResult) return verifyCsrfResult;

  return verifySession();
}
