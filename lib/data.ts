import { supabase } from "./supabase";
import type { Product, Site } from "@/types/database";

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
