import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";

/* Hero slider — a crossfade, not a wipe.
 *
 * Slides and captions are both stacked and cross-dissolve on opacity alone.
 * The previous build animated a clip-path across each layer, which meant every
 * mid-transition frame showed a hard vertical edge and two stacked legibility
 * washes. Here the only other motion is a very slow scale drift on the live
 * image, on a much longer channel than the fade so an incoming slide is already
 * moving before it is fully opaque.
 *
 * Returns a fragment: the absolutely-positioned backdrop plus an in-flow
 * control bar. .hero is a flex column justified to the end, so the bar lands
 * directly above the search card and lines up with it, and the controls stay in
 * the same component as the state that drives them. */

const SLIDES = [
  { pre: "Chase the", word: "Horizon", loc: "Ladakh, India", img: "/images/hero/hero-ladakh-4k.webp" },
  { pre: "Savour the", word: "Journey", loc: "Kerala Backwaters", img: "/images/hero/hero-kerala-4k.webp" },
  { pre: "Wander the", word: "Valleys", loc: "Pahalgam, Kashmir", img: "/images/hero/hero-kashmir-4k.webp" },
  { pre: "Escape to", word: "Paradise", loc: "Maldives", img: "/images/hero/hero-maldives-4k.webp" },
  { pre: "Change your", word: "Perspective", loc: "Bali, Indonesia", img: "/images/hero/hero-bali-4k.webp" },
];

const HS_INTERVAL = 6000;

export default function HeroSlides() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const N = SLIDES.length;

  const go = useCallback((i) => setActive(((i % N) + N) % N), [N]);

  /* Don't rotate underneath the preloader — otherwise the hero is revealed
     already on slide 2 or 3, with the progress rail part-filled. Checked in an
     effect rather than in a state initialiser because the preloader's DOM does
     not exist yet during the first render pass. */
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!document.querySelector(".pl")) { setArmed(true); return; }
    const on = () => setArmed(true);
    window.addEventListener("tu:reveal", on, { once: true });
    return () => window.removeEventListener("tu:reveal", on);
  }, []);

  /* Autoplay is resumable rather than restart-on-unpause: the cleanup banks
     how much of the interval was left, so the progress fill (which CSS merely
     pauses in place) and the timer stay in step. Declared before the timer
     effect so its reset runs first when `active` changes. */
  const left = useRef(HS_INTERVAL);
  const since = useRef(0);
  useEffect(() => { left.current = HS_INTERVAL; }, [active]);

  useEffect(() => {
    if (still || paused || !armed) return;
    since.current = performance.now();
    const t = setTimeout(() => setActive((v) => (v + 1) % N), left.current);
    return () => {
      clearTimeout(t);
      left.current = Math.max(0, left.current - (performance.now() - since.current));
    };
  }, [active, paused, still, armed, N]);

  return (
    <>
      <div className="hs">
        {SLIDES.map((s, i) => (
          <div className={`hs-slide${i === active ? " is-active" : ""}`} key={s.img} aria-hidden="true">
            <img src={s.img} alt="" loading={i === 0 ? "eager" : "lazy"} decoding="async" />
          </div>
        ))}

        <div className="hs-scrim" aria-hidden="true" />

        {/* Only the live caption is exposed — otherwise every slide's heading
            would be announced, and the page would report five h1s. */}
        {SLIDES.map((s, i) => (
          <div className={`hs-cap${i === active ? " is-active" : ""}`} key={s.word} aria-hidden={i !== active}>
            <span className="hs-loc">{s.loc}</span>
            <span className="hs-lead">{s.pre}</span>
            <h1 className="hs-word">{s.word}</h1>
          </div>
        ))}
      </div>

      <div
        className="hs-ui"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="container">
          <div className="hs-dots" role="group" aria-label="Choose a hero slide">
            {SLIDES.map((s, i) => (
              <button
                key={s.img}
                type="button"
                className={`hs-dot${i === active ? " is-active" : ""}`}
                aria-label={`${s.word} — ${s.loc}`}
                aria-current={i === active}
                onClick={() => go(i)}
              >
                {/* Keyed on `active` so the fill restarts with each new slide. */}
                {i === active && !still && armed && (
                  <i key={active} style={{ animationDuration: `${HS_INTERVAL}ms` }} />
                )}
              </button>
            ))}
          </div>

          <div className="hs-nav">
            <span className="hs-count">
              <b>{String(active + 1).padStart(2, "0")}</b> / {String(N).padStart(2, "0")}
            </span>
            <button type="button" className="hs-arrow" onClick={() => go(active - 1)} aria-label="Previous slide">
              <Icon name="arrowLeft" />
            </button>
            <button type="button" className="hs-arrow" onClick={() => go(active + 1)} aria-label="Next slide">
              <Icon name="arrow" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
