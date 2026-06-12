import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChronoShare",
  description: "ChronoShare",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#6eb5d9" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
