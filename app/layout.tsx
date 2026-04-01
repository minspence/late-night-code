import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Late Night Code",
  description: "Blog about web development, programming, and technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
