import type { CSSProperties } from "react";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { TemplateProps } from "@/components/templates/types";

export function CosmeticsTemplate({
  site,
  products,
  sections,
  pages,
}: TemplateProps) {
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
    <div className="flex min-h-screen flex-col text-neutral-900" style={pageStyle}>
      <SiteHeader site={site} pages={pages} />
      <main className="flex-1">
        <SectionRenderer sections={sections} site={site} products={products} />
      </main>
      <SiteFooter site={site} />
    </div>
  );
}
