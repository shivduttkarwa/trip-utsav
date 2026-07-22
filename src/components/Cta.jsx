import { useEffect, useRef, useState } from "react";

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
// easeInOutCubic — slow in, quick middle, gentle settle: a "nice" reveal.
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Scroll-driven CTA band with a full-bleed background video.
 *
 *  1. A white cover with world-map-shaped holes lets the video peek through
 *     the continents, with a big headline over it.
 *  2. On scroll: the map holes grow and the cover dissolves, revealing the
 *     full-bleed video.
 *  3. Then the CTA content animates in over it.
 *
 * A tall `.cta` is the scroll track; the `.cta-stage` is sticky, so we
 * translate scroll distance into one `--p` value (0 → 1) the CSS timelines read.
 * Honours prefers-reduced-motion by jumping straight to the revealed state.
 */
export default function Cta({ video, children }) {
  const sceneRef = useRef(null);
  const stageRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    const stage = stageRef.current;
    if (!scene || !stage) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage.style.setProperty("--p", "1");
      setRevealed(true);
      return;
    }

    let raf = 0;
    let running = false;
    let current = 0; // smoothed progress actually rendered
    let target = 0;  // raw scroll progress we chase

    const readTarget = () => {
      const rect = scene.getBoundingClientRect();
      const stickTop = parseFloat(getComputedStyle(stage).top) || 0;
      const travel = scene.offsetHeight - stage.offsetHeight;
      target = travel > 0 ? clamp((stickTop - rect.top) / travel, 0, 1) : 0;
      // Hysteresis so the timed content entrance doesn't flicker mid-scroll.
      setRevealed((was) => (target > 0.62 ? true : target < 0.45 ? false : was));
    };

    // Per-frame lerp: current eases toward target so coarse wheel steps
    // render as one continuous, buttery expansion instead of jumps.
    const tick = () => {
      current += (target - current) * 0.11;
      if (Math.abs(target - current) < 0.0003) {
        current = target;
        running = false;
      }
      stage.style.setProperty("--p", ease(current).toFixed(4));
      if (running) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const onScroll = () => {
      readTarget();
      kick();
    };

    readTarget();
    current = target;
    stage.style.setProperty("--p", ease(current).toFixed(4));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={`cta${revealed ? " is-revealed" : ""}`} ref={sceneRef}>
      <div className="cta-stage" ref={stageRef}>
        {/* full-bleed background video */}
        <video className="cta-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
          <source src={video} type="video/mp4" />
        </video>

        {/* white cover with world-map holes — dissolves on scroll */}
        <div className="cta-cover" aria-hidden="true" />

        {/* darkening scrim for text legibility, only once revealed */}
        <div className="cta-scrim" aria-hidden="true" />

        {/* Phase 1 — big text over the map; leaves with the map */}
        <div className="cta-intro" aria-hidden={revealed}>
          <h2 className="cta-intro-title">
            The World <em>Awaits</em>
          </h2>
          <span className="cta-intro-cue">
            Scroll to explore<i aria-hidden="true" />
          </span>
        </div>

        {/* Revealed CTA content */}
        <div className="container cta-content" aria-hidden={!revealed}>
          {children}
        </div>
      </div>
    </section>
  );
}
