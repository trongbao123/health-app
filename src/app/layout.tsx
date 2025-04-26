import type { Metadata } from "next";
import "./globals.css";
import ProviderLayout from "@/components/layout/provider-layout";

export const metadata: Metadata = {
  title: "HealthApp",
  description: "A healthcare web application",
  creator: "Trọng Bảo",
  keywords: ["health", "fitness", "body", "meal", "exercise", "tracker"],
  authors: [{ name: "Trọng Bảo" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ProviderLayout>{children}</ProviderLayout>
    </html>
  );
}
