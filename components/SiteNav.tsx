import Link from "next/link";
import type { SitePage } from "@/types/database";

type SiteNavProps = {
  pages: SitePage[];
};

export function SiteNav({ pages }: SiteNavProps) {
  if (pages.length === 0) return null;

  return (
    <nav className="relative shrink-0" aria-label="Páginas del sitio">
      <details className="group relative">
        <summary className="flex h-11 cursor-pointer list-none items-center gap-2 rounded-xl bg-white/80 px-3 font-[family-name:var(--font-catalog-sans)] text-sm font-semibold text-neutral-800 ring-1 ring-black/5 transition hover:bg-white hover:ring-black/10 [&::-webkit-details-marker]:hidden">
          Páginas
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="opacity-60 transition group-open:rotate-180"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </summary>

        <ul className="absolute right-0 z-30 mt-2 min-w-[12rem] overflow-hidden rounded-xl bg-white py-1 shadow-lg ring-1 ring-black/10">
          {pages.map((page) => (
            <li key={page.id}>
              <Link
                href={`/p/${page.slug}`}
                className="block px-4 py-2.5 font-[family-name:var(--font-catalog-sans)] text-sm text-neutral-800 transition hover:bg-neutral-50"
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </nav>
  );
}
