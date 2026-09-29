import { getSectionComponent } from "@/components/sections/registry";
import type { Product, Site, SiteSection } from "@/types/database";

type SectionRendererProps = {
  sections: SiteSection[];
  site: Site;
  products: Product[];
};

export function SectionRenderer({
  sections,
  site,
  products,
}: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        const Component = getSectionComponent(section.section_type);

        if (!Component) {
          console.warn(
            `Unknown section_type "${section.section_type}" (section id: ${section.id}). Skipping.`
          );
          return null;
        }

        return (
          <Component
            key={section.id}
            section={section}
            site={site}
            products={products}
          />
        );
      })}
    </>
  );
}
