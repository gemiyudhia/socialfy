import { login } from "@/lib/firebase/service";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const response = await login({ email, password });

        if (!response.status || !response.user) {
          throw new Error(response.error || "Login failed");
        }

        return {
          email: response.user.email || "", // Ensure email is not null
          username: response.user.username,
          role: response.user.role,
          userId: response.user.userId, // Tambahkan userId
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
        token.userId = user.userId; // Tambahkan userId ke token
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        email: token.email as string,
        username: token.username as string,
        role: token.role as string,
        userId: token.userId as string, // Tambahkan userId ke sesi
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
