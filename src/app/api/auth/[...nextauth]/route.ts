import { login } from "@/lib/firebase/service";
import { CustomToken, CustomUser } from "@/types/next-auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

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

        try {
          const response = await login({ email, password });

          console.log("Firebase response:", response);

          if (!response.status) {
            throw new Error(response.error || "Login failed");
          }

          // Pastikan data yang dikembalikan memiliki struktur `CustomUser`
          const user = response.user as CustomUser;
          return user;
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message || "Internal server error");
          }
          throw new Error("Internal server error");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Cast `user` ke tipe `CustomUser` setelah `unknown`
      if (user) {
        const customUser = user as CustomUser;
        token.email = customUser.email;
        token.username = customUser.username;
        token.role = customUser.role;
      }
      return token;
    },

    async session({ session, token }) {
      // Cast `token` ke tipe `CustomToken` setelah `unknown`
      const customToken = token as unknown as CustomToken;
      if (customToken) {
        session.user = {
          email: customToken.email,
          username: customToken.username,
          role: customToken.role,
        } as CustomUser;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
