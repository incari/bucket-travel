import { Header } from "../components/Header";
import { Hanken_Grotesk } from "next/font/google";

const inter = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans p-12`}>{children}</body>
    </html>
  );
}
