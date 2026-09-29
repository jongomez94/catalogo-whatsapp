import type { Product, Site, SiteSection } from "@/types/database";

export type SectionProps = {
  section: SiteSection;
  site: Site;
  products: Product[];
};

export function readConfigString(
  config: Record<string, unknown>,
  key: string
): string | null {
  const value = config[key];
  return typeof value === "string" && value.trim() ? value : null;
}
