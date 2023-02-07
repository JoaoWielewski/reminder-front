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
    jwt: async (token: any) => {
      const isSignIn = !!token.user;
      console.log(isSignIn);
      const actualDateInSeconds = Math.floor(Date.now() / 1000);
      const tokenExpirationInSeconds = (1 * 24 * 60 * 60);

      if (isSignIn) {
        const user = token.user;
        if (!user || !user.id || !user.email || !user.jwt) {
          return Promise.resolve({});
        }

        token.jwt = user.jwt;
        token.id = user.id;
        token.email = user.email;

        token.expiration = Math.floor(actualDateInSeconds + tokenExpirationInSeconds);
        console.log(token);
      } else {
        if (!token?.expiration) return Promise.resolve({});

        if (actualDateInSeconds > token.expiration) return Promise.resolve({});

      }

      return Promise.resolve(token);
    }
  },

};

export default NextAuth(authOptions);
