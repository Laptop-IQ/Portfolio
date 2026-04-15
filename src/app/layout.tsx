import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora, Unbounded } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laptop-IQ",
  description: "Laptop-IQ Personal Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${sora.variable}
          ${unbounded.variable}
          font-sora
        `}
      >
        {/* Navbar goes here */}
        <Nav />
        {children}
      </body>
    </html>
  );
}
