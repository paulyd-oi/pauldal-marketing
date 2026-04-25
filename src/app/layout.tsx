import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pauldalstudios.com"),
  title: {
    default: "Paul Dal Studio",
    template: "%s — Paul Dal Studio",
  },
  description:
    "San Diego hybrid photographer + videographer, available worldwide.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Paul Dal Studio",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plex.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="font-body bg-paper text-ink min-h-screen">
        <div className="grain min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
