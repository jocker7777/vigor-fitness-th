import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIGOR — พื้นที่ฝึกของคุณ",
  description: "คลังท่า โปรแกรมฝึก ตัวจับเวลา และบันทึกโภชนาการภาษาไทย",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
