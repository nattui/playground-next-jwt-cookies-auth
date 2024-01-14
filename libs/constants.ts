export const isDevelopment = process.env.NODE_ENV === "development";
export const origin = isDevelopment
  ? "http://localhost:3000"
  : "https://study-next-custom-auth.vercel.app";
