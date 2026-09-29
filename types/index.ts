export type { Site, Product } from "./database";

export type CartItem = {
  product: import("./database").Product;
  quantity: number;
};
