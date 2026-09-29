import type { CSSProperties } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { SiteHeader } from "@/components/SiteHeader";
import type { TemplateProps } from "@/components/templates/types";

/** Variación visual inicial (inciensos) — tipografía serif suave y tarjetas más rectas. */
export function IncenseTemplate({ site, products }: TemplateProps) {
  const pageStyle = {
    "--color-primary": site.primary_color,
    "--color-secondary": site.secondary_color,
    "--font-catalog-display": "Georgia, 'Times New Roman', serif",
    background: `
      radial-gradient(ellipse 80% 50% at 50% -20%, color-mix(in srgb, var(--color-secondary) 35%, transparent), transparent 60%),
      linear-gradient(165deg, #f7f3ec 0%, #ebe4d8 55%, #e4dccf 100%)
    `,
  } as CSSProperties;

  return (
    <div
      className="min-h-screen text-neutral-900 [&_article]:rounded-sm [&_article]:shadow-none [&_button]:rounded-sm"
      style={pageStyle}
    >
      <SiteHeader site={site} />

      <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="mb-7 flex items-end justify-between gap-4 border-b border-neutral-800/10 pb-5 sm:mb-9">
          <div>
            <p className="font-[family-name:var(--font-catalog-sans)] text-[0.65rem] font-medium uppercase tracking-[0.28em] text-neutral-500">
              Colección
            </p>
            <h2 className="mt-1 font-[family-name:var(--font-catalog-display)] text-2xl italic tracking-tight text-neutral-900 sm:text-3xl">
              Productos
            </h2>
            <p className="mt-1 font-[family-name:var(--font-catalog-sans)] text-sm text-neutral-500">
              {products.length} disponible
              {products.length === 1 ? "" : "s"}
            </p>
          </div>
          <span
            className="hidden h-px w-24 sm:block"
            style={{ backgroundColor: "var(--color-primary)" }}
            aria-hidden
          />
        </div>

        <ProductGrid products={products} />
      </main>
    </div>
  );
}
