import "~/styles/globals.css";

import { type Metadata } from "next";
import {
    Bodoni_Moda,
    Geist,
} from "next/font/google";
import localFont from "next/font/local";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/layout/navbar";
import { GuestProvider } from "~/contexts/guest-context";

export const metadata: Metadata = {
    title: "Pooja & Yash",
    description: "Wedding of Pooja and Yash. June 19, 2026.",
    icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

const sans = Geist({
    subsets: ["latin"],
    variable: "--font-custom-sans",
});

const serif = Bodoni_Moda({
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
                    <GuestProvider>
                        <Navbar />
                        {children}
                    </GuestProvider>
                </TRPCReactProvider>
            </body>
        </html>
    );
}
