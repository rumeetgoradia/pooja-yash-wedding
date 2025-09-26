import "~/styles/globals.css";

import { type Metadata } from "next";
import {
  Cormorant_Garamond,
  Geist,
  Lavishly_Yours,
  Newsreader,
} from "next/font/google";
import localFont from "next/font/local";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/layout/navbar";
import Background from "~/components/layout/background";

export const metadata: Metadata = {
  title: "Pooja & Yash",
  description: "Wedding of Pooja and Yash. June 19, 2026.",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-custom-sans",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-custom-serif",
});

const script = localFont({
  src: "../../public/fonts/CitadelScriptStd.otf",
  variable: "--font-custom-script",
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${script.variable}`}
    >
      <body>
        <TRPCReactProvider>
          <Navbar />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
