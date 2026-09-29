import type {
  Product,
  Site,
  SiteModulesMap,
  SitePage,
  SiteSection,
} from "@/types/database";

export type TemplateProps = {
  site: Site;
  products: Product[];
  sections: SiteSection[];
  pages: SitePage[];
  modules: SiteModulesMap;
};
