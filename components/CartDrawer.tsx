"use client";

import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { getProductImageUrl } from "@/lib/storage";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";

type CartDrawerProps = {
  whatsappNumber: string;
};

export function CartDrawer({ whatsappNumber }: CartDrawerProps) {
  const {
    items,
    total,
    isOpen,
    closeCart,
    setQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const canCheckout = items.length > 0 && Boolean(whatsappNumber.trim());

  function handleWhatsAppCheckout() {
    if (!canCheckout) return;
    const url = buildWhatsAppOrderUrl(whatsappNumber, items);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-neutral-950/40 transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden={!isOpen}
      />

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-[#f5f7fa] shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-neutral-200/80 px-5 py-4">
          <div>
            <p className="font-[family-name:var(--font-catalog-sans)] text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Tu pedido
            </p>
            <h2 className="font-[family-name:var(--font-catalog-display)] text-2xl tracking-tight text-neutral-900">
              Carrito
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-600 ring-1 ring-black/5 transition hover:bg-white"
            aria-label="Cerrar carrito"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full min-h-48 flex-col items-center justify-center text-center">
              <p className="font-[family-name:var(--font-catalog-display)] text-xl text-neutral-800">
                El carrito está vacío
              </p>
              <p className="mt-2 max-w-xs font-[family-name:var(--font-catalog-sans)] text-sm text-neutral-500">
                Agregá productos del catálogo para armar tu pedido.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map(({ product, quantity }) => {
                const imageUrl = getProductImageUrl(product.image_url);

                return (
                <li
                  key={product.id}
                  className="flex gap-3 rounded-2xl bg-white/90 p-3 ring-1 ring-black/[0.06]"
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-[color:color-mix(in_srgb,var(--color-secondary)_20%,#e8edf2)]">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center text-xs font-semibold text-white"
                        style={{ backgroundColor: "var(--color-primary)" }}
                        aria-hidden
                      >
                        {product.name.trim().charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-[family-name:var(--font-catalog-display)] text-base leading-tight text-neutral-900">
                          {product.name}
                        </p>
                        <p
                          className="mt-0.5 font-[family-name:var(--font-catalog-sans)] text-sm font-semibold tabular-nums"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="shrink-0 text-xs font-medium text-neutral-400 transition hover:text-neutral-700"
                      >
                        Quitar
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-lg ring-1 ring-black/10">
                        <button
                          type="button"
                          onClick={() => setQuantity(product.id, quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-neutral-700 transition hover:bg-neutral-100"
                          aria-label={`Restar ${product.name}`}
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center font-[family-name:var(--font-catalog-sans)] text-sm font-semibold tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(product.id, quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-neutral-700 transition hover:bg-neutral-100"
                          aria-label={`Sumar ${product.name}`}
                        >
                          +
                        </button>
                      </div>
                      <p className="font-[family-name:var(--font-catalog-sans)] text-sm font-semibold tabular-nums text-neutral-800">
                        {formatPrice(product.price * quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-neutral-200/80 bg-white/70 px-5 py-4 backdrop-blur-sm">
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <span className="font-[family-name:var(--font-catalog-sans)] text-sm text-neutral-500">
              Total
            </span>
            <span className="font-[family-name:var(--font-catalog-display)] text-2xl tabular-nums text-neutral-900">
              {formatPrice(total)}
            </span>
          </div>

          {items.length > 0 ? (
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                disabled={!canCheckout}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl font-[family-name:var(--font-catalog-sans)] text-sm font-semibold tracking-wide text-white transition duration-200 hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  backgroundColor: "var(--color-primary)",
                  outlineColor: "var(--color-primary)",
                  boxShadow:
                    "0 12px 28px -16px color-mix(in srgb, var(--color-primary) 85%, transparent)",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12.04 2c-5.52 0-10 4.4-10 9.82 0 1.73.46 3.42 1.34 4.92L2 22l5.45-1.42a10.2 10.2 0 0 0 4.59 1.1h.01c5.52 0 10-4.4 10-9.83 0-2.62-1.05-5.09-2.95-6.94A10.1 10.1 0 0 0 12.04 2zm0 1.8a8.2 8.2 0 0 1 5.8 2.4 8.02 8.02 0 0 1 2.4 5.62c0 4.43-3.68 8.03-8.2 8.03a8.4 8.4 0 0 1-3.82-.92l-.27-.15-3.23.84.86-3.1-.18-.29a8.05 8.05 0 0 1-1.26-4.41c0-4.43 3.68-8.02 8.2-8.02zm4.66 10.34c-.07-.11-.4-.24-.83-.42-.43-.18-2.54-1.23-2.93-1.37-.39-.14-.68-.21-.96.2-.29.42-1.1 1.37-1.35 1.65-.25.28-.5.32-.92.11-.43-.21-1.8-.65-3.43-2.08a12.6 12.6 0 0 1-2.34-2.9c-.25-.42-.03-.65.18-.86.19-.19.43-.5.64-.75.21-.25.29-.42.43-.71.14-.28.07-.53-.04-.74-.11-.21-.96-2.27-1.31-3.11-.34-.8-.69-.7-.96-.71h-.82c-.28 0-.74.11-1.13.53-.39.42-1.48 1.42-1.48 3.47s1.52 4.02 1.73 4.3c.21.28 2.96 4.72 7.3 6.42 1.02.42 1.82.67 2.44.86a5.86 5.86 0 0 0 2.68.16c.82-.12 2.54-.1 2.9-1.27.36-1.17.36-2.17.25-2.38z" />
                </svg>
                Enviar orden por WhatsApp
              </button>
              <button
                type="button"
                onClick={clearCart}
                className="w-full text-center font-[family-name:var(--font-catalog-sans)] text-sm font-medium text-neutral-500 transition hover:text-neutral-800"
              >
                Vaciar carrito
              </button>
            </div>
          ) : null}
        </div>
      </aside>
    </>
  );
}
