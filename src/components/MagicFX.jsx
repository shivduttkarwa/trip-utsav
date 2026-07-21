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

    /* 2. 3D tilt on destination cards */
    document.querySelectorAll(".dest-card").forEach((card) => {
      bind(card, "pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`);
        card.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`);
      });
      bind(card, "pointerleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });

    /* 3. Magnetic primary CTAs */
    document.querySelectorAll(".btn-primary").forEach((btn) => {
      bind(btn, "pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.28;
        const y = (e.clientY - r.top - r.height / 2) * 0.32;
        btn.style.transform = `translate(${x.toFixed(1)}px, ${(y - 2).toFixed(1)}px)`;
      });
      bind(btn, "pointerleave", () => { btn.style.transform = ""; });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
