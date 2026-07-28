import { useEffect, useRef } from "react";

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Scroll-pinned CTA band.
 *
 * A tall `.cta` is the scroll track; `.cta-stage` is sticky inside it, so the
 * section locks to the viewport on entry and only releases once the whole
 * reveal has played. Scroll distance is translated into a single `--p`
 * (0 → 1) that every CSS timeline below reads — nothing is time-based, so
 * the animation is always exactly where the scrollbar is.
 *
 *   TIMELINE (--p)
 *   ─────────────────────────────────────────────────────────────────────
 *   0.00 – 0.08   ENTER   stage locks; world map at rest over the video
 *   0.04 – 0.34   EXIT    "The World Awaits" lifts away with the map
 *   0.08 – 0.42   OPEN    map holes grow, white cover dissolves → video
 *   0.30 – 0.52   LIGHT   legibility scrim + warm brand bloom fade in
 *   0.36 – 0.88   COPY    CTA children rise in one by one (0.07 apart)
 *   0.88 – 1.00   HOLD    fully revealed and still — THEN the pin releases
 *   ─────────────────────────────────────────────────────────────────────
 *
 * The HOLD tail is what stops the old "content still animating as the section
 * scrolls away" problem: p only reaches 1 after every child has landed.
 *
 * Honours prefers-reduced-motion by dropping the pin and jumping to p = 1.
 */
export default function Cta({ video, children }) {
  const sceneRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const stage = stageRef.current;
    if (!scene || !stage) return;

    const intro = stage.querySelector(".cta-intro");
    const content = stage.querySelector(".cta-content");

    const paint = (p) => {
      stage.style.setProperty("--p", p.toFixed(4));
      // Only the layer that is actually readable takes pointer/AT focus.
      const live = p > 0.5;
      scene.classList.toggle("is-live", live);
      if (intro) intro.setAttribute("aria-hidden", String(live));
      if (content) content.setAttribute("aria-hidden", String(!live));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(1);
      return;
    }

    let raf = 0;
    let running = false;
    let near = true;    // section anywhere near the viewport?
    let current = 0;    // smoothed progress actually painted
    let target = 0;     // raw scroll progress we chase

    const readTarget = () => {
      // Distance the sticky stage can travel inside its track. Measured from
      // the live layout so it stays correct across resize / font-size steps.
      const travel = scene.offsetHeight - stage.offsetHeight;
      const stickTop = parseFloat(getComputedStyle(stage).top) || 0;
      const scrolled = stickTop - scene.getBoundingClientRect().top;
      target = travel > 0 ? clamp01(scrolled / travel) : 0;
    };

    // Per-frame lerp: `current` eases toward `target`, so a coarse wheel step
    // renders as one continuous glide instead of a jump. Kept snappy enough
    // that the HOLD tail always absorbs the lag before the pin releases.
    const tick = () => {
      current += (target - current) * 0.16;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      paint(current);
      if (running) raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      if (!near) return;
      readTarget();
      kick();
    };

    // Don't run the loop while the band is far off-screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        if (near) onScroll();
      },
      { rootMargin: "120% 0px" }
    );
    io.observe(scene);

    readTarget();
    current = target;
    paint(current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="cta" ref={sceneRef}>
      <div className="cta-stage" ref={stageRef}>
        {/* full-bleed background video */}
        <video className="cta-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
          <source src={video} type="video/mp4" />
        </video>

        {/* white cover with world-map-shaped holes — dissolves on scroll */}
        <div className="cta-cover" aria-hidden="true" />

        {/* legibility wash: soft centre vignette, edges stay vivid */}
        <div className="cta-scrim" aria-hidden="true" />

        {/* warm brand bloom, blended as light so the frame never goes muddy */}
        <div className="cta-glow" aria-hidden="true" />

        {/* Phase 1 — big text over the map; leaves with the map */}
        <div className="cta-intro" aria-hidden="false">
          <h2 className="cta-intro-title">
            The World <em>Awaits</em>
          </h2>
          <span className="cta-intro-cue">
            Scroll to explore<i aria-hidden="true" />
          </span>
        </div>

        {/* Phase 2 — CTA content, staggered in over the full-bleed video */}
        <div className="cta-content" aria-hidden="true">
          <div className="container cta-content-inner">{children}</div>
        </div>

        {/* progress rail — tells the user the pin is deliberate, not stuck */}
        <div className="cta-rail" aria-hidden="true"><i /></div>
      </div>
    </section>
  );
}
