import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flight Affordability Calculator",
  description:
    "Calculate how much you can afford to spend on flights based on your after-tax salary and working hours.",
  openGraph: {
    title: "Flight Affordability Calculator",
    description:
      "Calculate your flight opportunity cost based on your salary and time.",
    url: "https://flightaffordability.aronteh.com", // Replace with your actual domain if deployed
    siteName: "Flight Affordability Calculator",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flight Affordability Calculator",
    description:
      "Calculate your flight affordability based on your salary and time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
