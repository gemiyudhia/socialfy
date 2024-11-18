import { User } from "next-auth";

export interface CustomUser extends User {
  email: string;
  username: string;
  role: string;
}

export interface CustomToken extends JWT {
  email: string;
  username: string;
  role: string;
  sub?: string; // ID pengguna
}

export interface JWT {
  email: string;
  username: string;
  role: string;
}
