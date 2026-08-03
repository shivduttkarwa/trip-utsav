import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import asset from "../asset";

/* Hero — "the flight".
 *
 * The site already tells one story in two other places: the preloader plots a
 * route on a world map and flies it, and the package cards are boarding passes
 * with dotted routes and airport codes. The hero is the leg between them — the
 * flight itself. A dashed route runs across the foot of the photograph with a
 * real airport code at every stop, and the autoplay timer IS a plane flying
 * the current leg. When it lands on a stop, the next destination doesn't
 * crossfade in: it BLOOMS out of the landing point, a circle opening from the
 * exact pixel the plane touched down on. Navigation, timer and transition are
 * one mechanic — there are no dots, no progress bar, nothing generic left.
 *
 * Transition model for the captions (unchanged): every layer has three poses —
 * a rest pose it waits in, an `is-in` pose, and an `is-out` pose — and only ONE
 * slide is ever marked `is-out`. Rest is deliberately untransitioned, so the
 * three captions not involved snap silently while the two that are play
 * against each other. `--dir` (+1 forward, -1 back) is published on the root
 * and every caption transform multiplies by it. The slides themselves no
 * longer fade at all: the outgoing frame simply holds still underneath while
 * the incoming one blooms over it.
 *
 * Returns a fragment: the absolutely-positioned backdrop plus an in-flow route
 * bar. .hero is a flex column justified to the end, so the bar lands directly
 * above the search card and lines up with it, and the controls stay in the
 * same component as the state that drives them. */

const SLIDES = [
  { pre: "Chase the", word: "Horizon", loc: "Ladakh, India", code: "LEH", city: "Leh", img: asset("images/hero/hero-ladakh-4k.webp") },
  { pre: "Savour the", word: "Journey", loc: "Kerala Backwaters", code: "COK", city: "Kochi", img: asset("images/hero/hero-kerala-4k.webp") },
  { pre: "Wander the", word: "Valleys", loc: "Pahalgam, Kashmir", code: "SXR", city: "Srinagar", img: asset("images/hero/hero-kashmir-4k.webp") },
  { pre: "Escape to", word: "Paradise", loc: "Maldives", code: "MLE", city: "Malé", img: asset("images/hero/hero-maldives-4k.webp") },
  { pre: "Change your", word: "Perspective", loc: "Bali, Indonesia", code: "DPS", city: "Denpasar", img: asset("images/hero/hero-bali-4k.webp") },
];

/* Stop positions, in % of the track. The bloom origin, the plane keyframes and
   the trail keyframes all derive from this one array. */
const X = [2, 26, 50, 74, 98];

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
     already on slide 2 or 3, with the route part-flown. Checked in an effect
     rather than in a state initialiser because the preloader's DOM does not
     exist yet during the first render pass. */
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!document.querySelector(".pl")) { setArmed(true); return; }
    const on = () => setArmed(true);
    window.addEventListener("tu:reveal", on, { once: true });
    return () => window.removeEventListener("tu:reveal", on);
  }, []);

  /* Autoplay is resumable rather than restart-on-unpause: the cleanup banks
     how much of the interval was left, so the plane (which CSS merely freezes
     mid-air) and the timer stay in step. Declared before the timer effect so
     its reset runs first when `active` changes. */
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
     the bloom. Decoding ahead moves that off the transition. */
  const imgRefs = useRef([]);
  useEffect(() => {
    for (const i of [(active + 1) % N, (active - 1 + N) % N]) {
      imgRefs.current[i]?.decode?.().catch(() => {});
    }
  }, [active, N]);

  // Release the outgoing layer once the bloom has finished covering it.
  useEffect(() => {
    if (prev < 0) return;
    const t = setTimeout(() => setNav((cur) => ({ ...cur, prev: -1 })), HS_SETTLE);
    return () => clearTimeout(t);
  }, [prev, active]);

  /* `is-first` marks an active slide with no outgoing frame beneath it — the
     initial mount, and each dwell after the previous slide is released. The
     bloom is suppressed there: a circle opening over the white page body is a
     flash, not a landing. (Gaining the class after settle is harmless — the
     finished bloom's end state and no-clip are the same full frame.) */
  const pose = (i) =>
    i === active ? ` is-in${prev < 0 ? " is-first" : ""}` : i === prev ? " is-out" : "";

  /* The leg being flown: from the active stop to the next. On the wrap leg the
     plane carries on past the last stop and off the end of the route (fading as
     it goes — see .is-loop) while the trail completes to the final stop. */
  const wrap = active === N - 1;
  const legVars = {
    "--sx": `${X[active]}%`,
    "--ex": `${wrap ? 104 : X[active + 1]}%`,
    "--et": `${wrap ? X[N - 1] : X[active + 1]}%`,
    animationDuration: `${HS_INTERVAL}ms`,
  };
  const flying = armed && !still;

  return (
    <>
      <div className="hs" style={{ "--dir": dir }}>
        {SLIDES.map((s, i) => (
          <div
            className={`hs-slide${pose(i)}`}
            key={s.img}
            style={{ "--bx": `${X[i]}%` }}
            aria-hidden="true"
          >
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
        <div className="hs-grain" aria-hidden="true" />

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
          <div className="hr" role="group" aria-label="Flight route — choose a destination">
            <div className="hr-track">
              <i className="hr-line" aria-hidden="true" />
              {flying ? (
                <>
                  {/* Keyed on `active` so each leg restarts its own flight. */}
                  <i className="hr-trail" key={`t${active}`} style={legVars} aria-hidden="true" />
                  <i className={`hr-plane${wrap ? " is-loop" : ""}`} key={`p${active}`} style={legVars} aria-hidden="true">
                    <Icon name="plane" />
                  </i>
                </>
              ) : (
                /* Not yet armed, or reduced motion: the plane waits at the gate. */
                <i className="hr-plane is-parked" style={{ left: `${X[active]}%` }} aria-hidden="true">
                  <Icon name="plane" />
                </i>
              )}
              {SLIDES.map((s, i) => (
                <button
                  key={s.code}
                  type="button"
                  className={`hr-stop${i === active ? " is-active" : ""}`}
                  style={{ "--x": `${X[i]}%` }}
                  aria-label={`Fly to ${s.word} — ${s.loc}`}
                  aria-current={i === active}
                  onClick={() => go(i)}
                >
                  <b className="hr-code">{s.code}</b>
                  <i className="hr-dot" aria-hidden="true" />
                  <span className="hr-city">{s.city}</span>
                </button>
              ))}
            </div>

            <div className="hr-nav">
              <button type="button" className="hs-arrow" onClick={() => go(active - 1, -1)} aria-label="Previous destination">
                <Icon name="arrowLeft" />
              </button>
              <button type="button" className="hs-arrow" onClick={() => go(active + 1, 1)} aria-label="Next destination">
                <Icon name="arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
