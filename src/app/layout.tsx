import './global.css';
import Header from "@/components/Header/Header";
import { Inter } from 'next/font/google';
import AuthContext from '@/components/AuthContext/AuthContext';

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
    <html lang="en">

      <head />
      <body>
        <AuthContext>
            <main className={inter.className}>
              {children}
            </main>
        </AuthContext>
      </body>
    </html>
  );
}
