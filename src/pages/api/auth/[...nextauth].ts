import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";

type NextAuthSession = {
  id: number;
  email: string;
  jwt: string;
  expiration: number;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials: any) {
        try {
          //const { email, password } = credentials;

          const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL! + `/login/${credentials.email}/${credentials.password}`);
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
    jwt: async (token: NextAuthSession, account: NextAuthSession) => {
      const isSignIn = !!account;
      console.log(isSignIn);
      const actualDateInSeconds = Math.floor(Date.now() / 1000);
      const tokenExpirationInSeconds = (1 * 24 * 60 * 60);

      if (isSignIn) {
        if (!account || !account.id || !account.email || !account.jwt) {
          return Promise.resolve({});
        }

        token.jwt = account.jwt;
        token.id = account.id;
        token.email = account.email;

        token.expiration = Math.floor(actualDateInSeconds + tokenExpirationInSeconds);
      } else {
        if (!token?.expiration) return Promise.resolve({});

        if (actualDateInSeconds > token.expiration) return Promise.resolve({});

        console.log(token);
      }

      return Promise.resolve(token);
    }
  },

};

export default NextAuth(authOptions);
