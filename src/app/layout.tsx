import AuthContext from '@/components/AuthContext/AuthContext';
import { Inter } from 'next/font/google';
import './global.css';
import Head from './head';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head />
      <body>
      <Head></Head>
        <AuthContext>
            <main className={inter.className}>
              {children}
            </main>
        </AuthContext>
      </body>
    </html>
  );
}
