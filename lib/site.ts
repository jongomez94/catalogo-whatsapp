export function getSiteSlug(): string {
  const slug = process.env.NEXT_PUBLIC_SITE_SLUG;

  if (!slug) {
    throw new Error("Missing NEXT_PUBLIC_SITE_SLUG");
  }

  return slug;
}
