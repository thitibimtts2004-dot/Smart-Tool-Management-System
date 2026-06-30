import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Tool Management System",
  description: "ระบบจัดการเครื่องมือและอุปกรณ์อัจฉริยะ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
