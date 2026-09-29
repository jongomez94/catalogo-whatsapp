import type { CSSProperties } from "react";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { TemplateProps } from "@/components/templates/types";

/** Variación visual inicial (comida) — tipografía bold y tarjetas más redondeadas. */
export function FoodTemplate({
  site,
  products,
  sections,
  pages,
}: TemplateProps) {
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
      className="flex min-h-screen flex-col text-neutral-900 [&_article]:rounded-[1.75rem] [&_button]:rounded-full [&_h1]:font-extrabold [&_h2]:font-extrabold"
      style={pageStyle}
    >
      <SiteHeader site={site} pages={pages} />
      <main className="flex-1">
        <SectionRenderer sections={sections} site={site} products={products} />
      </main>
      <SiteFooter site={site} variant="food" />
    </div>
  );
}
