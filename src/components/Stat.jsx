import { useEffect, useRef, useState } from "react";

/* Animated counter that runs once when scrolled into view */
export default function Stat({ value, suffix = "+", label, decimals = 0 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const dur = 1800;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay((value * eased).toFixed(decimals));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, decimals]);

  return (
    <div className="stat" ref={ref}>
      <div className="stat-num">
        {display}
        <span className="suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
