import type { Site } from "@/types/database";

type SiteFooterProps = {
  site: Site;
  variant?: "default" | "incense" | "food";
};

export function SiteFooter({ site, variant = "default" }: SiteFooterProps) {
  const year = new Date().getFullYear();

  if (variant === "incense") {
    return (
      <footer className="border-t border-neutral-800/10 px-5 py-10 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-[family-name:var(--font-catalog-display)] text-lg italic text-neutral-800">
            {site.business_name}
          </p>
          <p className="font-[family-name:var(--font-catalog-sans)] text-sm text-neutral-500">
            © {year} · Pedidos por WhatsApp
          </p>
        </div>
      </footer>
    );
  }

  if (variant === "food") {
    return (
      <footer className="mt-4 px-5 pb-10 sm:px-8">
        <div
          className="mx-auto flex w-full max-w-6xl flex-col items-start gap-2 rounded-[1.75rem] px-6 py-6 text-white sm:flex-row sm:items-center sm:justify-between"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <p className="font-[family-name:var(--font-catalog-display)] text-xl font-extrabold">
            {site.business_name}
          </p>
          <p className="font-[family-name:var(--font-catalog-sans)] text-sm text-white/85">
            © {year} · Ordená por WhatsApp
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-[color:color-mix(in_srgb,var(--color-secondary)_28%,transparent)] px-5 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-[family-name:var(--font-catalog-display)] text-lg text-neutral-800">
          {site.business_name}
        </p>
        <p className="font-[family-name:var(--font-catalog-sans)] text-sm text-neutral-500">
          © {year} · Catálogo WhatsApp
        </p>
      </div>
    </footer>
  );
}
