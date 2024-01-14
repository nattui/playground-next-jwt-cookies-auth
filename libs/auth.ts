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
    const user = { id: 2 };
    return user;
  } catch (error) {
    return null;
  }
}
