import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "旅行AI助手",
  description: "簡約的旅行規劃工具",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
