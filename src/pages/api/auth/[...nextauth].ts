import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

type NextAuthSession = {
  id: number;
  email: string;
  jwt: string;
  expiration: number;
  role: string;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials: any) {
        const params = {
          email: credentials.email,
          password: credentials.password,
        };

        try {
          const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + '/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
          });
          const user = await res.json();
          const { id, email, jwt } = user;

          if (!id || !email || !jwt) {
            return null;
          }

          return user;


        } catch {
          return null;
        }

      }
    })
  ],

  pages: {
    signIn: "/login"
  },

  callbacks: {
    /* @ts-ignore */
    async jwt({ token, user }: {token: NextAuthSession, user: NextAuthSession}) {
      const actualDateInSeconds = Math.floor(Date.now() / 1000);
      const tokenExpirationInSeconds = (1 * 24 * 60 * 60);

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.jwt = user.jwt;
        token.expiration = Math.floor(actualDateInSeconds + tokenExpirationInSeconds);
      } else {
        if (!token?.expiration) return null;

        if (actualDateInSeconds > token.expiration) return null;
      }

      return token;
    },

    /* @ts-ignore */
    async session({ session, token}: {session: NextAuthSession, token: NextAuthSession}) {
      if (!token.id || !token.email || !token.expiration || !token.jwt) {
        return null;
      }

      session.jwt = token.jwt;
      session.email = token.email;
      session.id = token.id;
      session.expiration = token.expiration;

      return session;
    }
  },

};

export default NextAuth(authOptions);
