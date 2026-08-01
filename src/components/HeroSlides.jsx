import { useEffect, useRef } from "react";
import gsap from "gsap";

/* Cinematic hero slider — a faithful port of the reference GSAP slider.
   Slides are stacked by z-index (slide 1 on top). A looping, yoyo-ing timeline
   wipes the current top slide's caption + image OUT to the left (clip-path
   collapse), revealing the slide beneath, then wipes the next caption IN. */
const SLIDES = [
  { pre: "Chase the", word: "Horizon", loc: "Ladakh, India", img: "/images/hero/hero-ladakh-4k.webp" },
  { pre: "Savour the", word: "Journey", loc: "Kerala Backwaters", img: "/images/hero/hero-kerala-4k.webp" },
  { pre: "Wander the", word: "Valleys", loc: "Pahalgam, Kashmir", img: "/images/hero/hero-kashmir-4k.webp" },
  { pre: "Escape to", word: "Paradise", loc: "Maldives", img: "/images/hero/hero-maldives-4k.webp" },
  { pre: "Change your", word: "Perspective", loc: "Bali, Indonesia", img: "/images/hero/hero-bali-4k.webp" },
];

const FULL = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const COLLAPSE = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";

export default function HeroSlides() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const del = 3;
      const N = SLIDES.length;

      // Forward-only loop so every slide always reveals in the same order
      // (h2 → h1 → h3). No yoyo, which would reverse that order on the way back.
      const tl = gsap.timeline({ repeat: -1 });

      // Slide 1's caption is shown; every other caption starts collapsed.
      gsap.set(["#hero-1 h2, #hero-1 h1, #hero-1 h3"], { clipPath: FULL });
      gsap.set(
        [
          `#hero-2 h2, #hero-3 h2, #hero-4 h2, #hero-5 h2,
           #hero-2 h1, #hero-3 h1, #hero-4 h1, #hero-5 h1,
           #hero-2 h3, #hero-3 h3, #hero-4 h3, #hero-5 h3`,
        ],
        { clipPath: COLLAPSE }
      );

      // Wipe slide `cur` out to reveal slide `next` (whose image wipes in on top
      // when it stacks higher — i.e. the loop-around back to slide 1).
      const step = (cur, next) => {
        tl.to(`#hero-${cur} h2`, 0.9, { clipPath: COLLAPSE, delay: del })
          .to(`#hero-${cur} h1`, 0.9, { clipPath: COLLAPSE }, "-=0.3")
          .to(`#hero-${cur} h3`, 0.9, { clipPath: COLLAPSE }, "-=0.3")
          .to(
            next > cur ? `#hero-${cur} .hi-${cur}` : `#hero-${next} .hi-${next}`,
            0.7,
            { clipPath: next > cur ? COLLAPSE : FULL },
            "-=1"
          )
          .to(`#hero-${next} h2`, 0.9, { clipPath: FULL })
          .to(`#hero-${next} h1`, 0.9, { clipPath: FULL }, "-=0.3")
          .to(`#hero-${next} h3`, 0.9, { clipPath: FULL }, "-=0.3");
      };

      for (let i = 1; i < N; i++) step(i, i + 1); // 1→2 … 4→5
      step(N, 1); // 5→1: slide 1 (top z) wipes back in, then GSAP resets under it
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main className="hs" ref={root} aria-hidden="true">
      {SLIDES.map((s, idx) => (
        <article id={`hero-${idx + 1}`} key={idx} style={{ "--i": SLIDES.length - idx }}>
          <div className="hs-info">
            <h2>{s.pre}</h2>
            <h1>{s.word}</h1>
            <h3>{s.loc}</h3>
          </div>
          <div
            className={`hs-image hi-${idx + 1}`}
            style={{ backgroundImage: `url("${s.img}")` }}
          />
        </article>
      ))}
    </main>
  );
}
