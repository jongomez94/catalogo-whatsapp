export type Site = {
  id: string;
  slug: string;
  business_name: string;
  whatsapp_number: string;
  primary_color: string;
  secondary_color: string;
  logo_url: string | null;
  template_key: string;
  created_at: string;
};

export type Product = {
  id: string;
  site_id: string;
  name: string;
  description: string | null;
  price: number;
  /** Relative path in bucket `product-images`, or absolute URL. */
  image_url: string | null;
  category: string | null;
  position: number;
  is_active: boolean;
  created_at: string;
};

export type SiteSection = {
  id: string;
  site_id: string;
  section_type: string;
  position: number;
  is_active: boolean;
  config: Record<string, unknown>;
  created_at?: string;
};

export type SiteModule = {
  id: string;
  site_id: string;
  module_key: string;
  enabled: boolean;
  config: Record<string, unknown>;
  created_at?: string;
};

export type SitePage = {
  id: string;
  site_id: string;
  slug: string;
  title: string;
  position: number;
  is_active: boolean;
  content: string | null;
  created_at?: string;
};

export type SiteModuleState = {
  enabled: boolean;
  config: Record<string, unknown>;
};

export type SiteModulesMap = Record<string, SiteModuleState>;
