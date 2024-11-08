import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Navbar from "../components/navbar";
import "./globals.css";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

const inter = Poppins({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider withGlobalClasses>
          <Navbar />
          <main className="flex min-h-screen flex-col">{children}</main>
        </MantineProvider>
      </body>
    </html>
  );
}
