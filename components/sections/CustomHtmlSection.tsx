import DOMPurify from "isomorphic-dompurify";
import type { SectionProps } from "@/components/sections/types";
import { readConfigString } from "@/components/sections/types";

export function CustomHtmlSection({ section }: SectionProps) {
  const rawHtml = readConfigString(section.config, "html");
  if (!rawHtml) return null;

  const sanitized = DOMPurify.sanitize(rawHtml, {
    USE_PROFILES: { html: true },
  });

  if (!sanitized.trim()) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <div
        className="prose prose-neutral max-w-none font-[family-name:var(--font-catalog-sans)]"
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />
    </section>
  );
}
