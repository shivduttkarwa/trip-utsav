import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Pointer-driven micro-interactions, wired up after every route change.
 * All effects are opt-out on touch devices and when reduced motion is set,
 * and every listener is cleaned up on navigation to avoid leaks.
 *   1. Cursor spotlight glow tracking across the hero image
 *   2. Real 3D tilt on destination cards (leans toward the cursor)
 *   3. Magnetic primary CTAs that ease toward the pointer
 */
export default function MagicFX() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const cleanups = [];
    const bind = (el, type, fn) => {
      el.addEventListener(type, fn);
      cleanups.push(() => el.removeEventListener(type, fn));
    };

    /* 1. Hero spotlight */
    const hero = document.querySelector(".hero");
    if (hero) {
      bind(hero, "pointermove", (e) => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
        hero.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    }

    /* The 3D pointer tilt that used to live here went with the destination
       card's rectangle. The card is a perforated stamp now, and its edge is a
       masked silhouette lit by a drop-shadow — rotating that in perspective
       just bends its own notches. The card's hover is entirely CSS now; see
       .dest-card in cards.css. */

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
