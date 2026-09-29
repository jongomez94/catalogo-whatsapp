import { supabase } from "./supabase";
import type {
  Product,
  Site,
  SiteModule,
  SiteModulesMap,
  SitePage,
  SiteSection,
} from "@/types/database";

export type SiteBundle = {
  site: Site;
  products: Product[];
  sections: SiteSection[];
  modules: SiteModulesMap;
  pages: SitePage[];
};

export async function getSite(slug: string): Promise<Site | null> {
  const { data, error } = await supabase
    .from("sites")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch site: ${error.message}`);
  }

  return data as Site | null;
}

export async function getProducts(siteId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("site_id", siteId)
    .eq("is_active", true)
    .order("position", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }

  return (data as Product[]) ?? [];
}

export async function getSections(siteId: string): Promise<SiteSection[]> {
  const { data, error } = await supabase
    .from("site_sections")
    .select("*")
    .eq("site_id", siteId)
    .eq("is_active", true)
    .order("position", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch sections: ${error.message}`);
  }

  return (data as SiteSection[]) ?? [];
}

export async function getModules(siteId: string): Promise<SiteModulesMap> {
  const { data, error } = await supabase
    .from("site_modules")
    .select("*")
    .eq("site_id", siteId);

  if (error) {
    throw new Error(`Failed to fetch modules: ${error.message}`);
  }

  const modules: SiteModulesMap = {};

  for (const row of (data as SiteModule[]) ?? []) {
    modules[row.module_key] = {
      enabled: Boolean(row.enabled),
      config: (row.config ?? {}) as Record<string, unknown>,
    };
  }

  return modules;
}

export async function getPages(siteId: string): Promise<SitePage[]> {
  const { data, error } = await supabase
    .from("site_pages")
    .select("*")
    .eq("site_id", siteId)
    .eq("is_active", true)
    .order("position", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch pages: ${error.message}`);
  }

  return (data as SitePage[]) ?? [];
}

/**
 * Loads everything needed to render a site.
 * Resolves the site by slug first, then fetches related data in parallel.
 */
export async function getSiteBundle(slug: string): Promise<SiteBundle | null> {
  const site = await getSite(slug);
  if (!site) return null;

  const [products, sections, modules, pages] = await Promise.all([
    getProducts(site.id),
    getSections(site.id),
    getModules(site.id),
    getPages(site.id),
  ]);

  return { site, products, sections, modules, pages };
}
