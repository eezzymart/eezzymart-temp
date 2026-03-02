import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import LayoutWrapper from "@/components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EezzyMart - Your One-Stop Online Shop",
  description:
    "Shop quality products at unbeatable prices. Fast delivery, easy returns, and amazing deals at EezzyMart.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "EezzyMart - Your One-Stop Online Shop",
    description:
      "Shop quality products at unbeatable prices. Fast delivery, easy returns, and amazing deals at EezzyMart.",
    url: "https://eezzymart.com",
    siteName: "EezzyMart",
    images: [
      {
        url: "https://eezzymart.com/logo-color-trimmed.png",
        width: 1200,
        height: 630,
        alt: "EezzyMart Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EezzyMart - Your One-Stop Online Shop",
    description:
      "Shop quality products at unbeatable prices. Fast delivery, easy returns, and amazing deals at EezzyMart.",
    images: ["https://eezzymart.com/logo-color-trimmed.png"],
  },
  metadataBase: new URL("https://eezzymart.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <CartProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
