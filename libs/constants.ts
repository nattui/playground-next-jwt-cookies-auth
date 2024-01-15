export const isDevelopment = process.env.NODE_ENV === "development";

export const url = {
  development: "http://localhost:3000",
  production: "https://study-next-custom-auth.vercel.app",
};

export const origin = isDevelopment ? url.development : url.production;

export const api = {
  signin: "/api/auth/signin",
  signout: "/api/auth/signout",
  verify: "/api/auth/verify",
};
