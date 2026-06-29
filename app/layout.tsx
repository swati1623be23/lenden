import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { OfflineStatusBanner } from "../components/pwa/OfflineStatusBanner";
import { PwaRegister } from "../components/pwa/PwaRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "LenDen", template: "%s | LenDen" },
  description: "Credit management dashboard for customers, credits, payments, and balances.",
  applicationName: "LenDen",
  manifest: "/manifest.json",
  themeColor: "#0f172a",
  icons: [
    { rel: "icon", url: "/icons/icon-192x192.png", type: "image/png" },
    { rel: "apple-touch-icon", url: "/icons/icon-192x192.png", type: "image/png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} lang="en">
      <body className="min-h-full bg-slate-50 text-slate-950">
        {children}
        <PwaRegister />
        <OfflineStatusBanner />
      </body>
    </html>
  );
}
