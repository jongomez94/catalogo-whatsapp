import Image from "next/image";
import type { SectionProps } from "@/components/sections/types";
import { readConfigString } from "@/components/sections/types";
import { getProductImageUrl } from "@/lib/storage";

export function HeroSection({ section }: SectionProps) {
  const title = readConfigString(section.config, "title") ?? "";
  const subtitle = readConfigString(section.config, "subtitle");
  const backgroundImage =
    readConfigString(section.config, "background_image") ??
    readConfigString(section.config, "image");
  const resolvedImage = getProductImageUrl(backgroundImage);

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-neutral-900">
        {resolvedImage ? (
          <Image
            src={resolvedImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              background: `
                linear-gradient(135deg,
                  color-mix(in srgb, var(--color-primary) 70%, #111),
                  color-mix(in srgb, var(--color-secondary) 55%, #222)
                )
              `,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-black/25" />
      </div>

      <div className="mx-auto flex min-h-[52vh] w-full max-w-6xl flex-col justify-end px-5 pb-12 pt-24 sm:min-h-[58vh] sm:px-8 sm:pb-16">
        {title ? (
          <h2 className="max-w-3xl font-[family-name:var(--font-catalog-display)] text-4xl leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h2>
        ) : null}
        {subtitle ? (
          <p className="mt-4 max-w-2xl font-[family-name:var(--font-catalog-sans)] text-base leading-relaxed text-white/85 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
