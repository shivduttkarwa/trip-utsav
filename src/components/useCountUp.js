import { useEffect, useRef, useState } from "react";

/* Grouped, so 25000 reads as 25,000 rather than a run of digits. */
const format = (n, decimals) =>
  n.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

/**
 * Counts 0 → value once the returned ref's element scrolls into view, then
 * stops observing. Attach the ref to whatever should trigger the count.
 *
 * Shared by the About page's stat blocks and the homepage band: the same four
 * numbers, rendered in completely different markup. Reduced motion skips the
 * climb and shows the final figure.
 */
export default function useCountUp(value, decimals = 0, duration = 1800) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(() => format(0, decimals));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(format(value, decimals));
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(format(value * eased, decimals));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, decimals, duration]);

  return [ref, display];
}
