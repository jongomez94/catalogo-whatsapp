"use client";

import Image from "next/image";
import type { Product } from "@/types/database";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { getProductImageUrl } from "@/lib/storage";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const imageUrl = getProductImageUrl(product.image_url);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white/80 shadow-[0_1px_0_rgba(0,0,0,0.04)] ring-1 ring-black/[0.06] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.35)] hover:ring-black/[0.1]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[color:color-mix(in_srgb,var(--color-secondary)_18%,#e8edf2)]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center"
            style={{
              background: `
                linear-gradient(145deg,
                  color-mix(in srgb, var(--color-secondary) 40%, #eef1f4),
                  color-mix(in srgb, var(--color-primary) 14%, #e8edf2) 55%,
                  #dde3ea
                )
              `,
            }}
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--color-primary) 16%, white)",
                color: "var(--color-primary)",
              }}
              aria-hidden
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <circle cx="8.5" cy="10" r="1.5" />
                <path d="M21 16l-5.5-5.5L8 18" />
              </svg>
            </span>
            <span className="font-[family-name:var(--font-catalog-sans)] text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
              Sin imagen
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-[family-name:var(--font-catalog-display)] text-xl leading-snug tracking-tight text-neutral-900">
            {product.name}
          </h2>
          <p
            className="shrink-0 font-[family-name:var(--font-catalog-sans)] text-sm font-semibold tabular-nums"
            style={{ color: "var(--color-primary)" }}
          >
            {formatPrice(product.price)}
          </p>
        </div>

        {product.description ? (
          <p className="line-clamp-3 font-[family-name:var(--font-catalog-sans)] text-sm leading-relaxed text-neutral-600">
            {product.description}
          </p>
        ) : (
          <div className="flex-1" />
        )}

        <button
          type="button"
          onClick={() => addItem(product)}
          className="mt-auto inline-flex h-11 w-full items-center justify-center rounded-xl font-[family-name:var(--font-catalog-sans)] text-sm font-semibold tracking-wide text-white transition duration-200 hover:brightness-110 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            backgroundColor: "var(--color-primary)",
            outlineColor: "var(--color-primary)",
            boxShadow:
              "0 10px 24px -14px color-mix(in srgb, var(--color-primary) 80%, transparent)",
          }}
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
