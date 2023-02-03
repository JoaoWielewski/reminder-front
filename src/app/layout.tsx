//'use client';

import './global.css';
import Header from "./components/Header/page";
import { Roboto } from '@next/font/google';
import AuthContext from './components/AuthContext/page';
//import { SessionProvider } from 'next-auth/react';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({
  children, session
}: {
  children: React.ReactNode,
  session: any,
}) {
  return (
    <html lang="en">

      <head />
      <body>
        <AuthContext session={session}>
          <main className={roboto.className}>
            <Header></Header>
            {children}
          </main>
        </AuthContext>
      </body>
    </html>
  );
}
