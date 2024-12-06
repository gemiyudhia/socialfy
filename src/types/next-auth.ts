import { User } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

export interface CustomUser extends User {
  email: string;
  username: string;
  role: string;
}

export interface CustomToken extends DefaultJWT {
  email: string;
  username: string;
  role: string;
}

export interface JWT {
  email: string;
  username: string;
  role: string;
}
