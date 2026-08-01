import { useEffect, useRef, useState } from "react";
import { useUI } from "./UIContext";
import { SITE } from "../data/site";
import Icon from "./Icon";

/* Toast, WhatsApp float, back-to-top and the one-time preloader */

export function ToastHost() {
  const { toast } = useUI();
  return (
    <div className={`toast${toast.show ? " show" : ""}`} role="status">
      <Icon name="check" />
      <span>{toast.msg}</span>
    </div>
  );
}

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a className="wa-float" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <Icon name="whatsapp" />
      </a>
      <button
        className={`to-top${showTop ? " show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <Icon name="up" />
      </button>
    </>
  );
}

/* ---------- PRELOADER ----------
   A flight-route loader: the plane's position along the arc IS the progress
   bar. Real progress (document readiness) is smoothed against a minimum
   on-screen time so it never flashes or stalls at 99%. */

const PL_DESTS = ["BALI", "DUBAI", "MALDIVES", "SINGAPORE", "KASHMIR", "SWISS ALPS", "THAILAND"];
/* One `d` shared by the dotted route, the drawn trail and the plane's path. */
const PL_ARC = "M34,102 C124,20 252,4 366,58";
/* Material "flight" glyph — drawn nose-up in a 24 box, rotated to +x below. */
const PL_PLANE =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

export function Preloader() {
  const [phase, setPhase] = useState("in");   // in → out → done
  const [dest, setDest] = useState(0);
  const arcRef = useRef(null);      // geometry source (no pathLength on it)
  const trailRef = useRef(null);
  const planeRef = useRef(null);
  const pctRef = useRef(null);

  /* Drive the counter, the trail and the plane from one rAF loop. Everything
     here is written straight to the DOM — re-rendering React 60×/s to move a
     plane 2px is waste. */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const trail = trailRef.current;
    const arc = arcRef.current;
    const len = arc ? arc.getTotalLength() : 0;

    const MIN = reduce ? 260 : 1400;   // never flash by
    const RUN = reduce ? 320 : 2400;   // time the ceiling takes to reach 96%
    let loaded = document.readyState === "complete";
    const onLoad = () => { loaded = true; };
    window.addEventListener("load", onLoad);

    const paint = (p) => {
      if (pctRef.current) pctRef.current.textContent = String(Math.round(p)).padStart(2, "0");
      if (trail) trail.style.strokeDashoffset = String(1 - p / 100);
      if (planeRef.current && len) {
        const at = (len * p) / 100;
        const a = arc.getPointAtLength(at);
        const b = arc.getPointAtLength(Math.min(len, at + 1));
        const deg = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
        planeRef.current.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${deg})`);
      }
    };

    const t0 = performance.now();
    let p = 0;
    let raf = 0;

    const tick = (now) => {
      const e = now - t0;
      const ceiling = 96 * (1 - Math.pow(1 - Math.min(1, e / RUN), 2.2));
      const target = loaded && e > MIN ? 100 : ceiling;
      p += (target - p) * 0.12;
      if (target === 100 && p > 99.3) p = 100;
      paint(p);
      if (p >= 100) { setPhase("out"); return; }
      raf = requestAnimationFrame(tick);
    };

    paint(0);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("load", onLoad); };
  }, []);

  /* Departure-board flip on the destination code, only while loading. */
  useEffect(() => {
    if (phase !== "in") return;
    const id = setInterval(() => setDest((i) => (i + 1) % PL_DESTS.length), 560);
    return () => clearInterval(id);
  }, [phase]);

  /* Hold the page still underneath, and unmount once the curtains are up. */
  useEffect(() => {
    if (phase === "done") return;
    if (phase === "in") {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
    const t = setTimeout(() => setPhase("done"), 1350);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => () => { document.body.style.overflow = ""; }, []);

  if (phase === "done") return null;

  return (
    <div className={`pl${phase === "out" ? " out" : ""}`} role="status" aria-label="Loading">
      <div className="pl-panels" aria-hidden="true"><i /><i /><i /></div>

      <div className="pl-content">
        <span className="pl-kicker">Travel More, Celebrate Life</span>
        <div className="pl-word">Trip <em>Utsav</em></div>

        <svg className="pl-map" viewBox="0 0 400 140" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="plTrail" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffd8b6" stopOpacity="0.25" />
              <stop offset="55%" stopColor="#ffb27a" />
              <stop offset="100%" stopColor="#e0613a" />
            </linearGradient>
          </defs>

          <path ref={arcRef} className="pl-arc" d={PL_ARC} strokeDasharray="0.5 7" strokeLinecap="round" />
          <path
            ref={trailRef}
            className="pl-trail"
            d={PL_ARC}
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="1"
            strokeLinecap="round"
          />

          <circle className="pl-ping" cx="34" cy="102" r="4" />
          <circle className="pl-node" cx="34" cy="102" r="3.4" />
          <circle className="pl-pin" cx="366" cy="58" r="5.4" />
          <circle className="pl-node pl-node-end" cx="366" cy="58" r="2" />

          <text className="pl-code" x="34" y="126">DEL</text>
          <text className="pl-code pl-code-end" x="366" y="82" key={dest}>{PL_DESTS[dest]}</text>

          <g ref={planeRef} className="pl-plane">
            <g transform="rotate(90) scale(0.82) translate(-11.5 -12)">
              <path d={PL_PLANE} />
            </g>
          </g>
        </svg>

        <div className="pl-meta">
          <span>Plotting your route</span>
          <span className="pl-pct"><b ref={pctRef}>00</b>%</span>
        </div>
      </div>
    </div>
  );
}
