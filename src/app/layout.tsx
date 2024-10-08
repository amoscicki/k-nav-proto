import type { Metadata } from "next";
import "./globals.css";

import { Inter } from "next/font/google";

import "reflect-metadata";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "New Kozak App",
  description: "Generated by KozakCLI powered by Next.js",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`dark ${inter.className}`}>{children}</body>
    </html>
  );
}
