import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "贾维斯 HUD",
  description: "先进全息用户界面",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "贾维斯 HUD",
    description: "先进全息用户界面",
    url: "https://jarvis-cv.vercel.app/",
    siteName: "贾维斯 HUD",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "贾维斯 HUD",
    description: "先进全息用户界面",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`antialiased bg-black overflow-hidden`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
