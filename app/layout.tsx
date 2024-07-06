import Header from "@/components/header";
import { ViewTransitions } from "next-view-transitions";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  style: "normal",
  subsets: ["latin-ext"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" className={`"scroll-smooth" ${inter.variable}`}>
        <body className="flex min-h-screen flex-col pb-14 pt-10">
          <Header />
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
