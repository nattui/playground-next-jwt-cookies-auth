import { origin } from "@/libs/constants";
import { cookies, headers } from "next/headers";

export async function getUser() {
  const cookieStore = cookies();
  const csrf = cookieStore.get("csrf")?.value ?? "";
  const response = await fetch(`${origin}/api/auth/verify`, {
    headers: {
      "x-token-csrf": csrf,
      Cookie: cookieStore.toString(),
    },
  });
  if (!response.ok) return;
  return await response.json();
}

export function verifyCsrf() {
  const headerList = headers();
  const headerCsrf = headerList.get("x-token-csrf");
  if (!headerCsrf) {
    return Response.json(
      { error: "CSRF token does not exist in header." },
      { status: 403 }
    );
  }

  const cookieCsrf = cookies().get("csrf");
  if (!cookieCsrf) {
    return Response.json(
      { error: "CSRF token does not exist in cookie." },
      { status: 403 }
    );
  }

  if (headerCsrf !== cookieCsrf.value) {
    return Response.json({ error: "CSRF token mismatch." }, { status: 403 });
  }
}
