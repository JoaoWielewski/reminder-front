import './global.css';
import Header from "@/components/Header/Header";
import { Roboto } from '@next/font/google';
import AuthContext from '@/components/AuthContext/AuthContext';
import CartProvider from '@/components/CartContext/CartContext';
import EditProvider from '@/components/EditContext/EditContext';

const roboto = Roboto({
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
            <main className={roboto.className}>
              <Header></Header>
              {children}
            </main>
          </EditProvider>
          </CartProvider>
        </AuthContext>
      </body>
    </html>
  );
}
