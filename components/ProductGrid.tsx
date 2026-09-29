import type { Product } from "@/types/database";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300/80 bg-white/50 px-6 py-16 text-center">
        <p className="font-[family-name:var(--font-catalog-display)] text-xl text-neutral-800">
          Todavía no hay productos
        </p>
        <p className="mt-2 font-[family-name:var(--font-catalog-sans)] text-sm text-neutral-500">
          Volvé pronto — el catálogo se actualiza solo.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.id} className="min-w-0">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
