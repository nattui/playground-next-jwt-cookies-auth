import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUser() {
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

export async function getUser2() {
  const isDevelopment = process.env.NODE_ENV === "development";
  const origin = isDevelopment
    ? "http://localhost:3000"
    : "https://study-next-custom-auth.vercel.app";
  const response = await fetch(`${origin}/api/auth/verify`, {
    headers: { Cookie: cookies().toString() },
  });
  if (!response.ok) return;
  return await response.json();
}
