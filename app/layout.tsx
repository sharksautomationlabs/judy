import type { Metadata } from "next";
import { Anton, Inter, Poppins, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { CartProvider } from './contexts/CartContext';
import { CheckoutProvider } from './contexts/CheckoutContext';
import CartSidePanel from './components/CartSidePanel';

const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-anton',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-barlow',
});

export const metadata: Metadata = {
  title: "Judith Hobson - Author | You Are Not The Only One",
  description: "Discover the inspiring works of Judith Hobson, author of 'You Are Not The Only One' and 'An Old Little Lady'. Explore her books, learn about her journey, and connect with her stories that touch hearts and minds.",
  keywords: "Judith Hobson, author, books, You Are Not The Only One, An Old Little Lady, literature, storytelling, inspiration",
  authors: [{ name: "Judith Hobson" }],
  creator: "Judith Hobson",
  publisher: "Judith Hobson",
  openGraph: {
    title: "Judith Hobson - Author | You Are Not The Only One",
    description: "Discover the inspiring works of Judith Hobson, author of 'You Are Not The Only One' and 'An Old Little Lady'.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Judith Hobson - Author",
    description: "Discover the inspiring works of Judith Hobson, author of 'You Are Not The Only One' and 'An Old Little Lady'.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} ${poppins.variable} ${barlow.variable}`}>
      <body>
        <CartProvider>
          <CheckoutProvider>
            {children}
            <CartSidePanel />
          </CheckoutProvider>
        </CartProvider>
      </body>
    </html>
  );
}
