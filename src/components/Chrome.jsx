import { useEffect, useRef, useState } from "react";
import { useUI } from "./UIContext";
import { SITE } from "../data/site";
import { WORLD_LAND } from "./worldMap";
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
   A world-map loader: the plane hops Delhi → Dubai → Paris → New York and its
   position along the route IS the progress bar. Progress is time-driven with a
   floor of PL_RUN ms, then gated on document readiness, so it never flashes by
   on a warm cache nor stalls at 99% on a cold one.

   Map is plate carrée (equirectangular) on a 1000×500 grid, so
   x = (lon + 180) × 2.7778 and y = (90 − lat) × 2.7778. Every stop below sits
   at its real coordinates; the coastlines are deliberately low-poly. */

const PL_RUN = 5000;       // ms the journey takes at full length
const PL_DWELL = 0.085;    // share of the timeline spent parked at each stop

const PL_STOPS = [
  { code: "DEL", city: "Delhi", x: 714, y: 171 },
  { code: "DXB", city: "Dubai", x: 654, y: 180 },
  { code: "CDG", city: "Paris", x: 506, y: 114 },
  { code: "JFK", city: "New York", x: 295, y: 137 },
];

/* One quadratic per leg, bulging north like a great circle. Kept as separate
   paths (not one `d`) so each leg can be measured, drawn and timed on its own. */
const PL_LEGS = [
  "M714,171 Q684,150 654,180",
  "M654,180 Q580,116 506,114",
  "M506,114 Q400,86 295,137",
];

/* Material "flight" glyph — drawn nose-up in a 24 box, rotated to +x below. */
const PL_PLANE =
  "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z";

const easeIO = (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);

export function Preloader() {
  const [phase, setPhase] = useState("in");   // in → out → done
  const baseRefs = useRef([]);   // geometry source (no pathLength on these)
  const trailRefs = useRef([]);
  const stopRefs = useRef([]);
  const planeRef = useRef(null);
  const pctRef = useRef(null);
  const legRef = useRef(null);

  /* Drive the counter, the trails, the stop pins and the plane from one rAF
     loop, written straight to the DOM — re-rendering React 60×/s to move a
     plane two pixels is waste. */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bases = baseRefs.current.filter(Boolean);
    if (!bases.length) return;

    const lens = bases.map((p) => p.getTotalLength());
    const total = lens.reduce((a, b) => a + b, 0);
    const frac = lens.map((l) => l / total);
    const stopAt = lens.map((_, i) => lens.slice(0, i).reduce((a, b) => a + b, 0));
    stopAt.push(total);

    /* Timeline → distance. Flying time is split across legs by length, with a
       flat PL_DWELL hold at every intermediate stop; each leg eases in and out
       so the plane takes off and lands rather than sliding at constant speed. */
    const flyW = 1 - PL_DWELL * (lens.length - 1);
    const journey = (t) => {
      let acc = 0;
      let d = 0;
      for (let i = 0; i < lens.length; i++) {
        const w = flyW * frac[i];
        if (t < acc + w) return d + frac[i] * easeIO((t - acc) / w);
        acc += w;
        d += frac[i];
        if (i < lens.length - 1) {
          if (t < acc + PL_DWELL) return d;
          acc += PL_DWELL;
        }
      }
      return 1;
    };

    const paint = (p) => {
      if (pctRef.current) pctRef.current.textContent = String(Math.round(p)).padStart(2, "0");

      const flown = journey(p / 100) * total;
      let rest = flown;
      let placed = false;

      lens.forEach((l, i) => {
        const drawn = Math.max(0, Math.min(l, rest));
        const trail = trailRefs.current[i];
        if (trail) trail.style.strokeDashoffset = String(1 - drawn / l);

        if (!placed && (drawn < l || i === lens.length - 1)) {
          placed = true;
          if (planeRef.current) {
            const a = bases[i].getPointAtLength(drawn);
            const b = bases[i].getPointAtLength(Math.min(l, drawn + 1));
            const deg = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
            planeRef.current.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${deg})`);
          }
          if (legRef.current) {
            legRef.current.textContent = `${PL_STOPS[i].city} → ${PL_STOPS[i + 1].city}`;
          }
        }
        rest -= l;
      });

      stopRefs.current.forEach((el, j) => {
        if (el) el.classList.toggle("on", flown >= stopAt[j] - 0.01);
      });
    };

    const RUN = reduce ? 700 : PL_RUN;
    let loaded = document.readyState === "complete";
    const onLoad = () => { loaded = true; };
    window.addEventListener("load", onLoad);

    const t0 = performance.now();
    let p = 0;
    let raf = 0;

    const tick = (now) => {
      const e = now - t0;
      const ceiling = 97 * Math.min(1, e / RUN);
      const target = loaded && e >= RUN ? 100 : ceiling;
      p += (target - p) * 0.16;
      if (target === 100 && p > 99.4) p = 100;
      paint(p);
      if (p >= 100) { setPhase("out"); return; }
      raf = requestAnimationFrame(tick);
    };

    paint(0);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("load", onLoad); };
  }, []);

  /* Hold the page still underneath, and unmount once the curtains are up. */
  useEffect(() => {
    if (phase === "done") return;
    if (phase === "in") {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
    const t = setTimeout(() => setPhase("done"), 1450);
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

        <svg className="pl-map" viewBox="0 18 1000 404" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="plTrail" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffd8b6" stopOpacity="0.3" />
              <stop offset="55%" stopColor="#ffb27a" />
              <stop offset="100%" stopColor="#e0613a" />
            </linearGradient>
          </defs>

          <path className="pl-land" d={WORLD_LAND} />
          <path className="pl-equator" d="M0,250 H1000" />

          {PL_LEGS.map((d, i) => (
            <path
              key={`b${i}`}
              ref={(el) => (baseRefs.current[i] = el)}
              className="pl-route"
              d={d}
              strokeDasharray="0.5 7"
              strokeLinecap="round"
            />
          ))}
          {PL_LEGS.map((d, i) => (
            <path
              key={`t${i}`}
              ref={(el) => (trailRefs.current[i] = el)}
              className="pl-trail"
              d={d}
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="1"
              strokeLinecap="round"
            />
          ))}

          {PL_STOPS.map((s, i) => (
            <g key={s.code} ref={(el) => (stopRefs.current[i] = el)} className="pl-stop">
              <circle className="pl-pulse" cx={s.x} cy={s.y} r="7" />
              <circle className="pl-ring" cx={s.x} cy={s.y} r="7" />
              <circle className="pl-dot" cx={s.x} cy={s.y} r="2.6" />
              <text className="pl-code" x={s.x} y={s.y + 27}>{s.code}</text>
            </g>
          ))}

          <g ref={planeRef} className="pl-plane">
            <g transform="rotate(90) scale(1.15) translate(-11.5 -12)">
              <path d={PL_PLANE} />
            </g>
          </g>
        </svg>

        <div className="pl-meta">
          <span ref={legRef}>Delhi → Dubai</span>
          <span className="pl-pct"><b ref={pctRef}>00</b>%</span>
        </div>
      </div>
    </div>
  );
}
