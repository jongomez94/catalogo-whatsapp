"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/CartDrawer";

type CartShellProps = {
  siteSlug: string;
  whatsappNumber: string;
  children: ReactNode;
};

export function CartShell({
  siteSlug,
  whatsappNumber,
  children,
}: CartShellProps) {
  return (
    <CartProvider siteSlug={siteSlug}>
      {children}
      <CartDrawer whatsappNumber={whatsappNumber} />
    </CartProvider>
  );
}
