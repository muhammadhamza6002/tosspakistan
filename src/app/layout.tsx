import type { Metadata } from "next";
import { Bagel_Fat_One, Inter, Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { CartDrawer } from "@/components/cart-drawer";
import { StickyOrderButton } from "@/components/sticky-order-button";
import { Nav } from "@/components/nav";
import { StarsBackground } from "@/components/stars-background";

const display = Bagel_Fat_One({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TOSS Pizzeria — Real Neapolitan pizza in Islamabad",
  description:
    "No fluff, no fancy. Just real pizzas done right. Authentic Neapolitan pizza in F-11/1, Islamabad. Order on WhatsApp.",
  openGraph: {
    title: "TOSS Pizzeria",
    description: "No fluff, no fancy. Just real pizzas done right.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${hand.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-ink">
        <StarsBackground />
        <CartProvider>
          <Nav />
          <main className="flex-1 relative z-10">{children}</main>
          <CartDrawer />
          <StickyOrderButton />
        </CartProvider>
      </body>
    </html>
  );
}
