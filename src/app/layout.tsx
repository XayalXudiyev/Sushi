import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const body = Manrope({ variable: "--font-body", subsets: ["latin", "latin-ext"] });
const heading = Unbounded({ variable: "--font-heading", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: { default: "NORI Sushi — təzə suşi çatdırılması", template: "%s · NORI Sushi" },
  description: "Rollar, nigiri, saşimi və setlər. 35 dəqiqəyə çatdırılma.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="az" className={`${body.variable} ${heading.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
