import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import NavBar from "@/components/NavBar";
import SideMenu from "@/components/SideMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solluna Farms Onboarding",
  description: "App used to track user onboarding to the Algorand Blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <SideMenu />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
