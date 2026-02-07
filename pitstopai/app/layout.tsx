import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PitStopAI | Your Kenyan AI Mechanic for Kenyan Roads",
  description: "Diagnose car issues, get real KES part prices, avoiding fakes in Nairobi, and find legit mechanics for your Toyota Premises, Prado, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-pit-black text-pit-text`}
      >
        {children}
      </body>
    </html>
  );
}
