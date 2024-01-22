import { api, origin } from "@/libs/constants";
import { base64url, jwtVerify } from "jose";
import { cookies, headers } from "next/headers";

export async function getUser() {
  const cookieStore = cookies();
  const csrf = cookieStore.get("csrf")?.value ?? "";
  const response = await fetch(`${origin}${api.verify}`, {
    headers: {
      "X-Token-Csrf": csrf,
      Cookie: cookieStore.toString(),
    },
    // cache: "force-cache",
  });
  if (!response.ok) return;
  return await response.json();
}

export function verifyCsrf() {
  const headerList = headers();
  const headerCsrf = headerList.get("X-Token-Csrf");
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

export interface Payload {
  exp: number;
  iat: number;
  id: string;
}

export const secret = base64url.decode(process.env.JWT_EXPIRATION);

export async function verifySession() {
  const cookieSession = cookies().get("session");
  if (!cookieSession) {
    return Response.json({ error: "Token does not exist." }, { status: 400 });
  }

  try {
    // Verify JWT token
    const session = cookieSession.value;
    const { payload } = await jwtVerify(session, secret);
    const user = { id: payload.id, time: Date.now(), random: Math.random() };
    return Response.json(user);
  } catch (error) {
    return Response.json({ error: "Verification failed." }, { status: 400 });
  }
}
