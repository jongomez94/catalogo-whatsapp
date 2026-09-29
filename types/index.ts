export type {
  Site,
  Product,
  SiteSection,
  SiteModule,
  SitePage,
  SiteModuleState,
  SiteModulesMap,
} from "./database";

export type CartItem = {
  product: import("./database").Product;
  quantity: number;
};
