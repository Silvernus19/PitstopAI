import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
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
  metadataBase: new URL("https://pitstopai.vercel.app"), // Replace with your actual domain when deployed
  title: "PitStopAI | Your Kenyan AI Mechanic for Kenyan Roads",
  description: "Diagnose car issues, get real KES part prices, avoiding fakes in Nairobi, and find legit mechanics for your Toyota Premises, Prado, and more.",
  openGraph: {
    title: "PitStopAI | Your Kenyan AI Mechanic",
    description: "Expert car diagnostics and maintenance advice for Kenyan drivers.",
    url: "https://pitstopai.vercel.app",
    siteName: "PitStopAI",
    images: [
      {
        url: "/opengraph-image", // Points to our dynamic generator
        width: 1200,
        height: 630,
        alt: "PitStopAI - Your Kenyan AI Mechanic",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PitStopAI | Your Kenyan AI Mechanic",
    description: "Expert car diagnostics and maintenance advice for Kenyan drivers.",
    images: ["/opengraph-image"],
  },
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
        <Toaster position="top-right" theme="dark" />
      </body>
    </html>
  );
}
