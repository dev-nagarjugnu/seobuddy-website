// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend the default `Session` type to include the 'role'
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: "ADMIN" | "USER"; // <-- NEW: Made role optional here
    } & DefaultSession["user"];
  }

  // Extend the default `User` type (the one from database in authorize callback)
  interface User extends DefaultUser {
    id: string;
    role?: "ADMIN" | "USER"; // <-- NEW: Made role optional here
  }
}

// Extend the default `JWT` type to include the 'id' and 'role'
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: "ADMIN" | "USER"; // <-- NEW: Made role optional here
  }
}