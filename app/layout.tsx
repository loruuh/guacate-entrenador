import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "CaptarCherry 🍒 - Spanisch lernen",
  description: "Spanisch lernen mit KI-generierten Beispielsätzen 🍒",
  manifest: "/manifest.json",
  themeColor: "#DC143C",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CaptarCherry 🍒",
  },
  icons: {
    icon: [
      { url: "/icon-192.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon-192.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
