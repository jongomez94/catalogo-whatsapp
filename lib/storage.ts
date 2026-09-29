const PRODUCT_IMAGES_BUCKET = "product-images";

function isAbsoluteUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

/**
 * Resolves a product image stored as a relative Storage path
 * (e.g. "demo/hongo-ostra.jpg") into the public URL for the
 * "product-images" bucket. Absolute URLs are returned as-is.
 */
export function getProductImageUrl(
  pathOrUrl: string | null | undefined
): string | null {
  if (!pathOrUrl) return null;

  const value = pathOrUrl.trim();
  if (!value) return null;
  if (isAbsoluteUrl(value)) return value;

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  const objectPath = value.replace(/^\/+/, "");
  return `${baseUrl.replace(/\/+$/, "")}/storage/v1/object/public/${PRODUCT_IMAGES_BUCKET}/${objectPath}`;
}
