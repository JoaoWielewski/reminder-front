import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        const { email, password } = credentials;

        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/login/${email}/${password}`);

        try {
          const user = await res.json();
          return user;
        } catch {
          return null;
        }

      }
    })
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login"
  },

};

export default NextAuth(authOptions);
