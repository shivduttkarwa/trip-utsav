import { useEffect, useState } from "react";
import { FALLBACK_IMG } from "../data/packages";

/**
 * Full-bleed hero background slideshow. Crossfades through the given images
 * on a timer (default every 3s) with a slow ken-burns zoom on the active
 * slide. Honours prefers-reduced-motion by holding on the first image.
 */
export default function HeroSlider({ slides, interval = 3000 }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((v) => (v + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [slides.length, interval]);

  return (
    <div className="hero-media">
      {slides.map((src, i) => (
        <div
          className={`hero-slide${i === active ? " is-active" : ""}`}
          key={i}
          aria-hidden="true"
        >
          <img
            src={src}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
          />
        </div>
      ))}
    </div>
  );
}
