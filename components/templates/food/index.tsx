import type { CSSProperties } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { SiteHeader } from "@/components/SiteHeader";
import type { TemplateProps } from "@/components/templates/types";

/** Variación visual inicial (comida) — tipografía bold y tarjetas más redondeadas. */
export function FoodTemplate({ site, products }: TemplateProps) {
  const pageStyle = {
    "--color-primary": site.primary_color,
    "--color-secondary": site.secondary_color,
    background: `
      radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--color-primary) 18%, transparent), transparent 40%),
      radial-gradient(circle at 100% 10%, color-mix(in srgb, var(--color-secondary) 22%, transparent), transparent 35%),
      linear-gradient(180deg, #fff8f1 0%, #f3ebe3 100%)
    `,
  } as CSSProperties;

  return (
    <div
      className="min-h-screen text-neutral-900 [&_article]:rounded-[1.75rem] [&_button]:rounded-full [&_h1]:font-extrabold [&_h2]:font-extrabold"
      style={pageStyle}
    >
      <SiteHeader site={site} />

      <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="mb-7 flex flex-col gap-2 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-catalog-display)] text-3xl tracking-tight text-neutral-900 sm:text-4xl">
              El menú
            </h2>
            <p className="mt-1 font-[family-name:var(--font-catalog-sans)] text-sm font-medium text-neutral-500">
              {products.length} disponible
              {products.length === 1 ? "" : "s"}
            </p>
          </div>
          <span
            className="inline-flex h-8 w-fit items-center rounded-full px-3 text-xs font-semibold uppercase tracking-wider text-white"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Pedí por WhatsApp
          </span>
        </div>

        <ProductGrid products={products} />
      </main>
    </div>
  );
}
