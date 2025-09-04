import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist, Libre_Bodoni } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Pooja & Yash",
  description: "Wedding of Pooja and Yash. June 19, 2026.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const libre_bodoni = Libre_Bodoni({
  subsets: ["latin"],
  variable: "--font-libre-bodoni",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${libre_bodoni.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
