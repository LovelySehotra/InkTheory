import type { Metadata } from 'next';
import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Chatbot from '@/components/chatbot';

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
});

const outfit = Outfit({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ink Theory | Premium Luxury Tattoo Studio',
  description: 'Ink Theory is an elite luxury tattoo studio crafting customized fine art, hyperrealism, blackwork, and geometric tattoos. Book your consultation today.',
  openGraph: {
    title: 'Ink Theory | Premium Luxury Tattoo Studio',
    description: 'Crafting premium custom tattoos that embody your personal story. Elite artists, luxury experience, and absolute precision.',
    type: 'website',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground pt-24 font-sans selection:bg-accent selection:text-white">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
