"use client";

import { useCart } from "@/lib/cart-context";

export function CartButton() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/80 text-neutral-800 ring-1 ring-black/5 transition hover:bg-white hover:ring-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ outlineColor: "var(--color-primary)" }}
      aria-label={
        itemCount > 0
          ? `Abrir carrito, ${itemCount} artículo${itemCount === 1 ? "" : "s"}`
          : "Abrir carrito"
      }
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 6h15l-1.5 9h-12z" />
        <path d="M6 6l-1-3H2" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </svg>
      {itemCount > 0 ? (
        <span
          className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-[0.65rem] font-bold text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </button>
  );
}
