import { useEffect, useRef } from "react";
import gsap from "gsap";
import { IMG } from "../data/packages";

/* Cinematic hero slider — a faithful port of the reference GSAP slider.
   Slides are stacked by z-index (slide 1 on top). A looping, yoyo-ing timeline
   wipes the current top slide's caption + image OUT to the left (clip-path
   collapse), revealing the slide beneath, then wipes the next caption IN. */
const SLIDES = [
  { pre: "Chase the", word: "Horizon", loc: "Ladakh, India", img: IMG("photo-1483728642387-6c3bdd6c93e5", 2200) },
  { pre: "Savour the", word: "Journey", loc: "Kerala Backwaters", img: IMG("photo-1602216056096-3b40cc0c9944", 2200) },
  { pre: "Wander the", word: "Valleys", loc: "Pahalgam, Kashmir", img: IMG("photo-1566837945700-30057527ade0", 2200) },
  { pre: "Escape to", word: "Paradise", loc: "Maldives", img: IMG("photo-1514282401047-d79a71a590e8", 2200) },
  { pre: "Change your", word: "Perspective", loc: "Bali, Indonesia", img: IMG("photo-1537996194471-e657df975ab4", 2200) },
];

const FULL = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const COLLAPSE = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";

export default function HeroSlides() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const del = 3;
      let i = 1;

      const tl = gsap.timeline({ repeat: -1, yoyo: true, ease: "expo.out" });

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

      while (i < 5) {
        tl.to(`#hero-${i} h2`, 0.9, { clipPath: COLLAPSE, delay: del })
          .to(`#hero-${i} h1`, 0.9, { clipPath: COLLAPSE }, "-=0.3")
          .to(`#hero-${i} h3`, 0.9, { clipPath: COLLAPSE }, "-=0.3")
          .to(`#hero-${i} .hi-${i}`, 0.7, { clipPath: COLLAPSE }, "-=1")
          .to(`#hero-${i + 1} h2`, 0.9, { clipPath: FULL })
          .to(`#hero-${i + 1} h1`, 0.9, { clipPath: FULL }, "-=0.3")
          .to(`#hero-${i + 1} h3`, 0.9, { clipPath: FULL }, "-=0.3");
        i++;
      }
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
