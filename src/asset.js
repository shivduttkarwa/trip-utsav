/**
 * Resolves a path in public/ against the site's base URL.
 *
 * Vite rewrites absolute asset URLs in HTML and CSS when `base` is set, but it
 * cannot do the same for JS — a string like "/images/x.webp" is just a string,
 * and there is no way to know it is a URL. On GitHub Pages the site is served
 * from /trip-utsav/, so every public asset referenced from JS has to be
 * prefixed here instead.
 *
 * Vite uses BASE_URL in both development and production, so this helper keeps
 * public assets correct regardless of where the application is mounted.
 */
export default function asset(path) {
  const base = import.meta.env?.BASE_URL ?? "/";
  return `${base.replace(/\/?$/, "/")}${String(path).replace(/^\/+/, "")}`;
}
