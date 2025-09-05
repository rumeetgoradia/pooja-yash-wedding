import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./components/layout/navbar";

export const metadata: Metadata = {
  title: "Pooja & Yash",
  description: "Wedding of Pooja and Yash. June 19, 2026.",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-custom-sans",
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-custom-serif",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <TRPCReactProvider>
          <Navbar />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
