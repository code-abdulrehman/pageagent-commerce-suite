import type { Metadata } from "next";
import "@/app/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import { PageAgentLoader } from "@/components/PageAgentLoader";

export const metadata: Metadata = {
  title: "Northstar Goods — Page Agent Commerce Suite",
  description: "A full Next.js commerce demo with PostgreSQL, operational workflows, and Page Agent."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <PageAgentLoader />
        </CartProvider>
      </body>
    </html>
  );
}
