import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";

const catalogDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-catalog-display",
  display: "swap",
});

const catalogSans = Figtree({
  subsets: ["latin"],
  variable: "--font-catalog-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Catálogo WhatsApp",
  description: "Catálogo de productos con pedido por WhatsApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${catalogDisplay.variable} ${catalogSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
