import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import asset from "../asset";

/* Hero slider.
 *
 * Transition model: every layer has three poses — a rest pose it waits in, an
 * `is-in` pose, and an `is-out` pose — and only ONE slide is ever marked
 * `is-out`. Rest is deliberately untransitioned, so the four slides that aren't
 * involved snap silently while the two that are play against each other. That
 * is what makes the exit readable: the outgoing caption leaves in the direction
 * of travel while the incoming one arrives from the opposite side, instead of
 * both dissolving in place.
 *
 * `--dir` (+1 forward, -1 back) is published on the root and every transform
 * multiplies by it, so the whole composition moves with the button you pressed.
 * The statement word is split per character to stagger against it.
 *
 * Returns a fragment: the absolutely-positioned backdrop plus an in-flow
 * control bar. .hero is a flex column justified to the end, so the bar lands
 * directly above the search card and lines up with it, and the controls stay in
 * the same component as the state that drives them. */

const SLIDES = [
  { pre: "Chase the", word: "Horizon", loc: "Ladakh, India", img: asset("images/hero/hero-ladakh-4k.webp") },
  { pre: "Savour the", word: "Journey", loc: "Kerala Backwaters", img: asset("images/hero/hero-kerala-4k.webp") },
  { pre: "Wander the", word: "Valleys", loc: "Pahalgam, Kashmir", img: asset("images/hero/hero-kashmir-4k.webp") },
  { pre: "Escape to", word: "Paradise", loc: "Maldives", img: asset("images/hero/hero-maldives-4k.webp") },
  { pre: "Change your", word: "Perspective", loc: "Bali, Indonesia", img: asset("images/hero/hero-bali-4k.webp") },
];

const HS_INTERVAL = 6000;
/* Long enough to cover the slowest exit, after which the outgoing layer is
   released back to rest so its next entrance starts from the full push-in. */
const HS_SETTLE = 1800;

export default function HeroSlides() {
  const [nav, setNav] = useState({ active: 0, prev: -1, dir: 1 });
  const { active, prev, dir } = nav;
  const [paused, setPaused] = useState(false);
  const [still] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const N = SLIDES.length;

  /* `d` is passed explicitly by the arrows and by autoplay so that wrapping
     from the last slide to the first still reads as travelling forward. */
  const go = useCallback((i, d) => {
    setNav((cur) => {
      const n = ((i % N) + N) % N;
      if (n === cur.active) return cur;
      return { active: n, prev: cur.active, dir: d ?? (n > cur.active ? 1 : -1) };
    });
  }, [N]);

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
    const t = setTimeout(() => go(active + 1, 1), left.current);
    return () => {
      clearTimeout(t);
      left.current = Math.max(0, left.current - (performance.now() - since.current));
    };
  }, [active, paused, still, armed, go]);

  /* Decode the neighbouring frames during the current slide's dwell.
     `loading="lazy"` buys nothing here — all five slides are full-viewport at
     the top of the page, so they intersect and fetch regardless. The cost is
     the DECODE: these are ~1.3 MB 4K stills, and decoding one at swap time
     blocked the main thread for ~290 ms, which swallowed the first third of
     the crossfade. Decoding ahead moves that off the transition. */
  const imgRefs = useRef([]);
  useEffect(() => {
    for (const i of [(active + 1) % N, (active - 1 + N) % N]) {
      imgRefs.current[i]?.decode?.().catch(() => {});
    }
  }, [active, N]);

  // Release the outgoing layer once its exit has finished playing.
  useEffect(() => {
    if (prev < 0) return;
    const t = setTimeout(() => setNav((cur) => ({ ...cur, prev: -1 })), HS_SETTLE);
    return () => clearTimeout(t);
  }, [prev, active]);

  const pose = (i) => (i === active ? " is-in" : i === prev ? " is-out" : "");

  return (
    <>
      <div className="hs" style={{ "--dir": dir }}>
        {SLIDES.map((s, i) => (
          <div className={`hs-slide${pose(i)}`} key={s.img} aria-hidden="true">
            <img
              ref={(el) => (imgRefs.current[i] = el)}
              src={s.img}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        ))}

        <div className="hs-scrim" aria-hidden="true" />

        {/* Only the live caption is exposed — otherwise every slide's heading
            would be announced, and the page would report five h1s. */}
        {SLIDES.map((s, i) => (
          <div className={`hs-cap${pose(i)}`} key={s.word} aria-hidden={i !== active}>
            <span className="hs-loc hs-anim" style={{ "--d": "0s" }}>{s.loc}</span>
            <span className="hs-lead hs-anim" style={{ "--d": "0.09s" }}>{s.pre}</span>
            {/* Split per character to stagger; aria-label keeps it one word to
                anything reading the page. */}
            <h1 className="hs-word" aria-label={s.word}>
              {[...s.word].map((ch, k) => (
                <span className="hs-anim" key={k} aria-hidden="true" style={{ "--d": `${(0.17 + k * 0.028).toFixed(3)}s` }}>
                  {ch}
                </span>
              ))}
            </h1>
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
            <button type="button" className="hs-arrow" onClick={() => go(active - 1, -1)} aria-label="Previous slide">
              <Icon name="arrowLeft" />
            </button>
            <button type="button" className="hs-arrow" onClick={() => go(active + 1, 1)} aria-label="Next slide">
              <Icon name="arrow" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
