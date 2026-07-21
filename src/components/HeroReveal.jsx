import { useEffect, useRef, useState } from "react";

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
// easeInOutCubic — slow in, quick middle, gentle settle: a "nice" reveal.
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Scroll-driven hero intro.
 *
 *  1. At the top: a single photo peeks through a world-map silhouette on a
 *     white page — nothing else.
 *  2. On scroll: the map dissolves away and the photo is revealed full-bleed.
 *  3. Then the hero text animates in over it.
 *
 * The dissolve uses two full-bleed layers of the SAME image at the same size:
 * one clipped to the map (fades out as it spreads), one un-clipped (fades in to
 * fill the oceans). Identical pixels → it reads as the map melting away.
 *
 * A tall `.hero-scene` is the scroll track; the `.hero-stage` is sticky, so we
 * translate scroll distance into one `--p` value (0 → 1) the CSS timelines read.
 * Honours prefers-reduced-motion by jumping straight to the revealed hero.
 */
export default function HeroReveal({ image, children }) {
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
      // Hysteresis so the timed text entrance doesn't flicker mid-scroll.
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

  // While the map intro owns the screen, hide the global chrome (header +
  // floating buttons). Dropping the class lets them animate in once we land
  // in the real hero. Cleared on unmount so inner pages are never affected.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("intro-lock", !revealed);
    return () => root.classList.remove("intro-lock");
  }, [revealed]);

  const bg = { backgroundImage: `url(${image})` };

  return (
    <section className={`hero-scene${revealed ? " is-revealed" : ""}`} ref={sceneRef}>
      <div className="hero-stage" ref={stageRef}>
        {/* full-bleed photo — oceans fill in as the map dissolves */}
        <div className="hero-photo" style={bg} aria-hidden="true" />

        {/* same photo, clipped to the world map — spreads out and fades away */}
        <div className="hero-mask" style={bg} aria-hidden="true" />

        {/* darkening scrim for text legibility, only once revealed */}
        <div className="hero-scrim" aria-hidden="true" />

        {/* Phase 1 — big attractive text over the map; leaves with the map */}
        <div className="hero-intro" aria-hidden={revealed}>
          <h2 className="hero-intro-title">
            The World <em>Awaits</em>
          </h2>
          <span className="hero-intro-cue">
            Scroll to explore<i aria-hidden="true" />
          </span>
        </div>

        {/* hero text */}
        <div className="container hero-inner hero-scene-content" aria-hidden={!revealed}>
          {children}
        </div>
      </div>
    </section>
  );
}
