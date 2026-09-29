import Image from "next/image";
import type { Site, SitePage } from "@/types/database";
import { CartButton } from "@/components/CartButton";
import { SiteNav } from "@/components/SiteNav";

type SiteHeaderProps = {
  site: Site;
  pages?: SitePage[];
};

export function SiteHeader({ site, pages = [] }: SiteHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-[color:color-mix(in_srgb,var(--color-secondary)_28%,transparent)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background: `
            radial-gradient(ellipse 80% 120% at 0% 0%, color-mix(in srgb, var(--color-secondary) 22%, transparent), transparent 55%),
            radial-gradient(ellipse 70% 100% at 100% 0%, color-mix(in srgb, var(--color-primary) 14%, transparent), transparent 50%)
          `,
        }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl items-center gap-3 px-5 py-8 sm:gap-5 sm:px-8 sm:py-10">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-white/70 ring-1 ring-black/5 sm:h-16 sm:w-16">
          {site.logo_url ? (
            <Image
              src={site.logo_url}
              alt={`Logo de ${site.business_name}`}
              fill
              className="object-cover"
              sizes="64px"
              priority
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-lg font-semibold tracking-tight text-white"
              style={{ backgroundColor: "var(--color-primary)" }}
              aria-hidden
            >
              {site.business_name.trim().charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-[family-name:var(--font-catalog-sans)] text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[color:color-mix(in_srgb,var(--color-primary)_75%,#1a1a1a)]">
            Catálogo
          </p>
          <h1 className="mt-1 truncate font-[family-name:var(--font-catalog-display)] text-3xl leading-none tracking-tight text-neutral-900 sm:text-4xl">
            {site.business_name}
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <SiteNav pages={pages} />
          <CartButton />
        </div>
      </div>
    </header>
  );
}
