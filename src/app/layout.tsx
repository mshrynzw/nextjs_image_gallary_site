import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Gallery",
  description: "画像ギャラリー（Next.js SSG）",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-white antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
