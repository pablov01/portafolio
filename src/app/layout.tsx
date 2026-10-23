import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Michroma } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { PROFILE } from "@/data/profile";
import "./globals.css";

const michroma = Michroma({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-michroma",
    display: "swap",
});

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
    display: "swap",
});

const plexMono = IBM_Plex_Mono({
    weight: ["400", "500"],
    subsets: ["latin"],
    variable: "--font-plex-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Pablo Villalba — Backend & DevOps Developer",
    description: PROFILE.bio,
    openGraph: {
        title: "Pablo Villalba — Backend & DevOps Developer",
        description: PROFILE.tagline,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pablo Villalba — Backend & DevOps Developer",
        description: PROFILE.tagline,
    },
};

export const viewport: Viewport = {
    themeColor: "#05070c",
    colorScheme: "dark",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${michroma.variable} ${manrope.variable} ${plexMono.variable}`}
        >
            <body className="bg-void text-regolith antialiased">
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-[4px] focus:bg-white focus:px-4 focus:py-2 focus:font-mono focus:text-label focus:text-void focus:uppercase"
                >
                    Skip to content
                </a>
                <SmoothScroll />
                {children}
            </body>
        </html>
    );
}
