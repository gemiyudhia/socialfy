import { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      email?: string;
      username?: string;
      role?: string;
      bio?: string;
      userId?: string;
      profilePicture?: string;
    } & DefaultSession["user"];
  }

  interface User {
    email?: string;
    username?: string;
    role?: string;
    bio?: string;
    userId?: string;
    profilePicture?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    email?: string;
    username?: string;
    role?: string;
    bio?: string;
    userId?: string;
    profilePicture?: string;
  }
}
