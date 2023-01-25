import './global.css';
import Header from "./components/Header/page";
import { Roboto } from '@next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <head />
      <body>
        <main className={roboto.className}>
          <Header></Header>
          {children}
        </main>
      </body>
    </html>
  )
}
