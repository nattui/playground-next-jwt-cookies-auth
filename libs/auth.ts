import { origin } from "@/libs/constants";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUser() {
  const response = await fetch(`${origin}/api/auth/verify`, {
    headers: { Cookie: cookies().toString() },
  });
  if (!response.ok) return;
  return await response.json();
}

export async function getUserOld() {
  // Get token from cookie
  const cookieStore = cookies();
  const cookieToken = cookieStore.get("token");
  if (!cookieToken) return null;

  try {
    // Verify JWT token
    const token = cookieToken.value;
    jwt.verify(token, process.env.JWT_SECRET);

    // TODO: Fetch user from database
    // await new Promise((resolve) => setTimeout(resolve, 100));
    const user = { id: 2, time: Date.now(), random: Math.random() };
    return user;
  } catch (error) {
    return null;
  }
}
