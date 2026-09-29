import { CartShell } from "@/components/CartShell";
import { getTemplate } from "@/components/templates/registry";
import { getProducts, getSite } from "@/lib/data";
import { getSiteSlug } from "@/lib/site";

export const revalidate = 60;

export default async function Home() {
  const slug = getSiteSlug();
  const site = await getSite(slug);

  if (!site) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-[#eef1f4] p-8">
        <h1 className="font-[family-name:var(--font-catalog-display)] text-2xl text-neutral-900">
          Sitio no encontrado
        </h1>
        <p className="font-[family-name:var(--font-catalog-sans)] text-sm text-neutral-600">
          No existe un sitio con el slug &quot;{slug}&quot;.
        </p>
      </main>
    );
  }

  const products = await getProducts(site.id);
  const Template = getTemplate(site.template_key);

  return (
    <CartShell siteSlug={site.slug} whatsappNumber={site.whatsapp_number}>
      <Template site={site} products={products} />
    </CartShell>
  );
}
