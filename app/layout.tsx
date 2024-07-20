import { Header } from "../components/Header";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Viewport } from "next";

const inter = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

// Prevent auto-zoom on inputs for IOS
//https://nextjs.org/docs/app/api-reference/functions/generate-viewport#generateviewport-function-1
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export const metadata = {
  title: "Bucket Travel",
  description: "Your place to plan your next adventure",
};

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
