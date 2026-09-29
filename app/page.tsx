import { CartShell } from "@/components/CartShell";
import { getTemplate } from "@/components/templates/registry";
import { getSiteBundle } from "@/lib/data";
import { getSiteSlug } from "@/lib/site";

export const revalidate = 60;

export default async function Home() {
  const slug = getSiteSlug();
  const bundle = await getSiteBundle(slug);

  if (!bundle) {
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

  const { site, products, sections, modules, pages } = bundle;
  const Template = getTemplate(site.template_key);

  return (
    <CartShell siteSlug={site.slug} whatsappNumber={site.whatsapp_number}>
      <Template
        site={site}
        products={products}
        sections={sections}
        pages={pages}
        modules={modules}
      />
    </CartShell>
  );
}
