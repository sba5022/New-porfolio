import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AnimationProvider from "@/components/AnimationProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sumaia Binta Asad | Website Developer Portfolio",
  description: "Jensen Omega - Software Developer Portfolio. Custom projects, website development, app development, and web hosting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-background selection:bg-accent selection:text-background overflow-x-hidden font-body-lg">
        <AnimationProvider>
          {children}
        </AnimationProvider>
      </body>
    </html>
  );
}
