import type { Product, Site } from "@/types/database";

export type TemplateProps = {
  site: Site;
  products: Product[];
};
