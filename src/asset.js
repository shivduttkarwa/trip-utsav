/**
 * Resolves a path in public/ against the site's base URL.
 *
 * Vite rewrites absolute asset URLs in HTML and CSS when `base` is set, but it
 * cannot do the same for JS — a string like "/images/x.webp" is just a string,
 * and there is no way to know it is a URL. On GitHub Pages the site is served
 * from /trip-utsav/, so every public asset referenced from JS has to be
 * prefixed here instead.
 *
 * BASE_URL is "/" in dev, so this is a no-op locally.
 */
export default function asset(path) {
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, "")}`;
}
