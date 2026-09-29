import type { CSSProperties } from "react";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { TemplateProps } from "@/components/templates/types";

/** Variación visual inicial (inciensos) — tipografía serif suave y tarjetas más rectas. */
export function IncenseTemplate({
  site,
  products,
  sections,
  pages,
}: TemplateProps) {
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
      className="flex min-h-screen flex-col text-neutral-900 [&_article]:rounded-sm [&_article]:shadow-none [&_button]:rounded-sm"
      style={pageStyle}
    >
      <SiteHeader site={site} pages={pages} />
      <main className="flex-1">
        <SectionRenderer sections={sections} site={site} products={products} />
      </main>
      <SiteFooter site={site} variant="incense" />
    </div>
  );
}
