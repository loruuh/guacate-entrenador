import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import UpdatePrompt from "@/components/UpdatePrompt";
import InstallButton from "@/components/InstallButton";
import InstallHint from "@/components/InstallHint";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "LingoLuup 🎯 - Spanisch lernen",
  description: "Spanisch lernen mit KI-generierten Beispielsätzen 🎯",
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
    title: "LingoLuup 🎯",
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
          <UpdatePrompt />
          <InstallButton />
          <InstallHint />
          <FeedbackWidget />
          <ThemeToggle />
        </Providers>
      </body>
    </html>
  );
}
