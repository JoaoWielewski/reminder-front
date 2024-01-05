import './global.css';
import Header from "@/components/Header/Header";
import { Inter } from 'next/font/google';
import AuthContext from '@/components/AuthContext/AuthContext';
import CartProvider from '@/components/CartContext/CartContext';
import EditProvider from '@/components/EditContext/EditContext';

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
          <CartProvider>
          <EditProvider>
            <main className={inter.className}>
              {children}
            </main>
          </EditProvider>
          </CartProvider>
        </AuthContext>
      </body>
    </html>
  );
}
