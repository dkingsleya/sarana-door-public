import { Footer, Navbar } from "@/components";
import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./provider";

export const metadata: Metadata = {
  title: "",
  description:
    "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="relative">
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
