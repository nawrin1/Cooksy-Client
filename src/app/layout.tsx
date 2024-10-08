/* eslint-disable prettier/prettier */




import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { fontSans } from "../config/fonts";
import { siteConfig } from "../config/site";
import { Providers } from "../lib/Providers";
import UserProvider from "../context/user.provider";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
      
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
         
              {children}

         
        </Providers>
        
      </body>
    </html>
  );
}
