import type { CSSProperties } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { SiteHeader } from "@/components/SiteHeader";
import type { TemplateProps } from "@/components/templates/types";

export function CosmeticsTemplate({ site, products }: TemplateProps) {
  const pageStyle = {
    "--color-primary": site.primary_color,
    "--color-secondary": site.secondary_color,
    background: `
      radial-gradient(ellipse 90% 60% at 10% -10%, color-mix(in srgb, var(--color-secondary) 28%, transparent), transparent 55%),
      radial-gradient(ellipse 70% 50% at 100% 0%, color-mix(in srgb, var(--color-primary) 16%, transparent), transparent 45%),
      linear-gradient(180deg, #f5f7fa 0%, #e8edf2 100%)
    `,
  } as CSSProperties;

  return (
    <div className="min-h-screen text-neutral-900" style={pageStyle}>
      <SiteHeader site={site} />

      <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
          <div>
            <h2 className="font-[family-name:var(--font-catalog-display)] text-2xl tracking-tight text-neutral-900 sm:text-3xl">
              Productos
            </h2>
            <p className="mt-1 font-[family-name:var(--font-catalog-sans)] text-sm text-neutral-500">
              {products.length} disponible
              {products.length === 1 ? "" : "s"}
            </p>
          </div>
          <span
            className="hidden h-1.5 w-16 rounded-full sm:block"
            style={{ backgroundColor: "var(--color-secondary)" }}
            aria-hidden
          />
        </div>

        <ProductGrid products={products} />
      </main>
    </div>
  );
}
