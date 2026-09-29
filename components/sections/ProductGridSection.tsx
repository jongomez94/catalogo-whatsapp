import { ProductGrid } from "@/components/ProductGrid";
import type { SectionProps } from "@/components/sections/types";
import { readConfigString } from "@/components/sections/types";

export function ProductGridSection({ section, products }: SectionProps) {
  const title = readConfigString(section.config, "title") ?? "Productos";
  const subtitle = readConfigString(section.config, "subtitle");

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
        <div>
          <h2 className="font-[family-name:var(--font-catalog-display)] text-2xl tracking-tight text-neutral-900 sm:text-3xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 font-[family-name:var(--font-catalog-sans)] text-sm text-neutral-500">
              {subtitle}
            </p>
          ) : (
            <p className="mt-1 font-[family-name:var(--font-catalog-sans)] text-sm text-neutral-500">
              {products.length} disponible
              {products.length === 1 ? "" : "s"}
            </p>
          )}
        </div>
        <span
          className="hidden h-1.5 w-16 rounded-full sm:block"
          style={{ backgroundColor: "var(--color-secondary)" }}
          aria-hidden
        />
      </div>

      <ProductGrid products={products} />
    </section>
  );
}
